import { DataSource, Repository } from 'typeorm'

import dataSource from '../../../database/dataSource'
import { LieuModel } from '../../../database/models/LieuModel'
import { LieuModelBuilder } from '../../../database/models/LieuModelBuilder'
import { importeDesLieux } from './importerDesLieux'

describe('importer des lieux', () => {
  let orm: Promise<DataSource>
  let lieuRepository: Repository<LieuModel>
  const lieuSpreadsheets = [
    'Maison de Justice et du Droit de Bourg en Bresse',
    '34 cours de Verdun',
    '1000',
    'Bourg En Bresse',
    'https://www.ain.gouv.fr/',
    '04 74 14 01 40',
    'OUI\nmais pas le dimanche',
    'TOUT DOMAINES',
    '46.2064358',
    '5.2272134',
    'mjd.bourg-en-bresse@example.com',
    'Lundi 9h00 à 12h00 et de 13h30 à 17h00\nMardi 9h00 à 12h00 et de 13h30 à 17h00\nMercredi 9h00 à 12h00 et de 13h30 à 17h00\nJeudi 9h00 à 12h00 et de 13h30 à 17h00\nVendredi 9h00 à 12h00 et de 13h30 à 17h00',
    '14/03/2022',
    'Ain',
    'Auvergne-Rhône-Alpes',
    'oui',
    'oui',
    'oui',
    'non',
    'non',
    'non',
    'non',
    'En partie\nformé',
  ]

  beforeEach(async () => {
    orm = dataSource.initialize()
    lieuRepository = (await orm).getRepository(LieuModel)
  })

  afterEach(async () => {
    await (await orm).createQueryBuilder().delete().from(LieuModel).execute()
    await (await orm).destroy()
  })

  it('importe les lieux', async () => {
    // GIVEN
    const sheets = { spreadsheets: { values: { get: jest.fn(() => ({ data: { values: [lieuSpreadsheets] } })) } } }
    const googleApis = { sheets: jest.fn(() => sheets) }

    // WHEN
    // @ts-ignore
    await importeDesLieux(orm, googleApis)

    // THEN
    expect(googleApis.sheets).toHaveBeenCalledWith({ auth: process.env.SPREADSHEET_AUTH, version: 'v4' })
    expect(sheets.spreadsheets.values.get).toHaveBeenCalledWith({
      majorDimension: 'ROWS',
      range: 'Production!A2:ZZ',
      spreadsheetId: process.env.SPREADSHEET_ID,
    })

    const lieuxModel = await lieuRepository.find()
    expect(lieuxModel).toStrictEqual([LieuModelBuilder.cree()])
  })

  it('importe un lieu qui n’a pas de commentaire', async () => {
    // GIVEN
    const lieuSansCommentaire = lieuSpreadsheets.slice(0, -1)
    const sheets = { spreadsheets: { values: { get: jest.fn(() => ({ data: { values: [lieuSansCommentaire] } })) } } }
    const googleApis = { sheets: jest.fn(() => sheets) }

    // WHEN
    // @ts-ignore
    await importeDesLieux(orm, googleApis)

    // THEN
    const lieuxModel = await lieuRepository.find()
    expect(lieuxModel).toStrictEqual([LieuModelBuilder.cree({ commentaire: '' })])
  })

  it('la table lieu est toujours remise à zéro et sa clé primaire est réinitialisée avant chaque sauvegarde', async () => {
    // GIVEN
    const lieuAvantMaj = LieuModelBuilder.cree({ nom: 'un lieu qui devrait avoir disparu' })
    await lieuRepository.insert([lieuAvantMaj])
    const sheets = { spreadsheets: { values: { get: jest.fn(() => ({ data: { values: [lieuSpreadsheets] } })) } } }
    const googleApis = { sheets: jest.fn(() => sheets) }

    // WHEN
    // @ts-ignore
    await importeDesLieux(orm, googleApis)

    // THEN
    const lieuxModel = await lieuRepository.find()
    expect(lieuxModel).toStrictEqual([LieuModelBuilder.cree({ nom: 'Maison de Justice et du Droit de Bourg en Bresse' })])
  })
})
