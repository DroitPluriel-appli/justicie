import { DataSource } from 'typeorm'

import { importeDesLieux } from './importerDesLieux'
import dataSource from '../../../database/dataSource'
import { LieuModel } from '../../../database/models/LieuModel'

describe('importer des lieux', () => {
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
  const orm: Promise<DataSource> = dataSource.initialize()

  beforeEach(async () => {
    await (await orm).query('START TRANSACTION')
  })

  afterEach(async () => {
    await (await orm).query('ROLLBACK TRANSACTION')
  })

  afterAll(async () => {
    await (await orm).destroy()
  })

  it('importe les lieux', async () => {
    // GIVEN
    const spreadsheets = { values: { get: vi.fn(() => ({ data: { values: [lieuSpreadsheets] } })) } }
    const sheets = vi.fn(() => ({ spreadsheets }))

    // WHEN
    // @ts-ignore
    await importeDesLieux(orm, sheets)

    // THEN
    expect(sheets).toHaveBeenCalledWith({ auth: process.env.SPREADSHEET_AUTH, version: 'v4' })
    expect(spreadsheets.values.get).toHaveBeenCalledWith({
      majorDimension: 'ROWS',
      range: 'Production!A2:ZZ',
      spreadsheetId: process.env.SPREADSHEET_ID,
    })

    const lieuxModel = await (await orm).manager.find(LieuModel)
    expect(lieuxModel).toStrictEqual([LieuModel.cree()])
  })

  it('importe un lieu qui n’a pas de commentaire', async () => {
    // GIVEN
    const lieuSansCommentaire = lieuSpreadsheets.slice(0, -1)
    const spreadsheets = { values: { get: vi.fn(() => ({ data: { values: [lieuSansCommentaire] } })) } }
    const sheets = vi.fn(() => ({ spreadsheets }))

    // WHEN
    // @ts-ignore
    await importeDesLieux(orm, sheets)

    // THEN
    const lieuxModel = await (await orm).manager.find(LieuModel)
    expect(lieuxModel).toStrictEqual([LieuModel.cree({ commentaire: '' })])
  })

  it('la table lieu est toujours remise à zéro et sa clé primaire est réinitialisée avant chaque sauvegarde', async () => {
    // GIVEN
    const lieuAvantMaj = LieuModel.cree({ nom: 'un lieu qui devrait avoir disparu' })
    await (await orm).manager.save([lieuAvantMaj], { transaction: false })
    const spreadsheets = { values: { get: vi.fn(() => ({ data: { values: [lieuSpreadsheets] } })) } }
    const sheets = vi.fn(() => ({ spreadsheets }))

    // WHEN
    // @ts-ignore
    await importeDesLieux(orm, sheets)

    // THEN
    const lieuxModel = await (await orm).manager.find(LieuModel)
    expect(lieuxModel).toStrictEqual([LieuModel.cree({ nom: 'Maison de Justice et du Droit de Bourg en Bresse' })])
  })
})
