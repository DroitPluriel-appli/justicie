import { DataSource, Repository } from 'typeorm'

import dataSource from '../../../database/dataSource'
import { LieuModel } from '../../../database/models/LieuModel'
import { LieuModelBuilder } from '../../../database/models/LieuModelBuilder'
import { majDesLieux } from './majDesLieuxCron'

describe('sauvegarde des entités juridiques', () => {
  let orm: Promise<DataSource>
  let lieuRepository: Repository<LieuModel>
  const lieu1 = [
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
    'oui',
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

  it('sauvegarde les lieux', async () => {
    // GIVEN
    const sheets = { spreadsheets: { values: { get: jest.fn(() => ({ data: { values: [lieu1] } })) } } }
    const googleApis = { sheets: jest.fn(() => sheets) }

    // WHEN
    // @ts-ignore
    await majDesLieux(orm, googleApis)

    // THEN
    expect(googleApis.sheets).toHaveBeenCalledWith({ auth: process.env.SPREADSHEET_AUTH, version: 'v4' })
    expect(sheets.spreadsheets.values.get).toHaveBeenCalledWith({
      majorDimension: 'ROWS',
      range: 'Production!A2:ZZ',
      spreadsheetId: process.env.SPREADSHEET_ID,
    })

    const lieuxQuery = await lieuRepository.find()
    expect(lieuxQuery).toStrictEqual([LieuModelBuilder.cree()])
  })

  it('la table lieu est toujours remise à zéro et sa clé primaire est réinitialisée avant chaque sauvegarde', async () => {
    // GIVEN
    const lieuAvantMaj = LieuModelBuilder.cree({ nom: 'un lieu qui devrait avoir disparu' })
    await lieuRepository.insert([lieuAvantMaj])
    const sheets = { spreadsheets: { values: { get: jest.fn(() => ({ data: { values: [lieu1] } })) } } }
    const googleApis = { sheets: jest.fn(() => sheets) }

    // WHEN
    // @ts-ignore
    await majDesLieux(orm, googleApis)

    // THEN
    const lieuxQuery = await lieuRepository.find()
    expect(lieuxQuery).toStrictEqual([LieuModelBuilder.cree()])
  })
})
