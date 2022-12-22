import { DataSource, Repository } from 'typeorm'

import dataSource from '../dataSource'
import { LieuModel } from '../models/EntitéJuridiqueModel'
import { majDesLieux } from './majDesLieux'

describe('sauvegarde des entités juridiques', () => {
  let orm: Promise<DataSource>
  let lieuRepository: Repository<LieuModel>
  const lieu1 = [
    'Maison de Justice et du Droit de Bourg en Bresse',
    '34 cours de Verdun',
    '1000',
    'Bourg En Bresse',
    'https://www.ain.gouv.fr/maison-de-la-justice-et-du-droit-a6099.html',
    '04 74 14 01 40',
    'OUI',
    'TOUT DOMAINES',
    '46.2064358',
    '5.2272134',
    'mjd.bourg-en-bresse@justice.fr',
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
    'En partie formé',
  ]

  beforeEach(async () => {
    orm = dataSource.initialize()
    lieuRepository = (await orm).getRepository(LieuModel)
  })

  afterEach(async () => {
    await lieuRepository.query('DELETE FROM lieu;')
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
    expect(lieuxQuery).toStrictEqual([maisonDeJustice()])
  })

  it('la table lieu est toujours remise à zéro et sa clé primaire est réinitialisée avant chaque sauvegarde', async () => {
    // GIVEN
    const lieuAvantMaj = new LieuModel()
    lieuAvantMaj.id = 1
    lieuAvantMaj.nom = 'un lieu qui devrait avoir disparu'
    lieuAvantMaj.adresse = '34 cours de Verdun'
    lieuAvantMaj.codePostal = '1000'
    lieuAvantMaj.ville = 'Bourg En Bresse'
    lieuAvantMaj.siteInternet = 'https://www.ain.gouv.fr/maison-de-la-justice-et-du-droit-a6099.html'
    lieuAvantMaj.telephone = '04 74 14 01 40'
    lieuAvantMaj.priseDeRendezVous = 'OUI'
    lieuAvantMaj.domaineDeDroit = 'TOUT DOMAINES'
    lieuAvantMaj.latitude = 46.2064358
    lieuAvantMaj.longitude = 5.2272134
    lieuAvantMaj.e_mail = 'mjd.bourg-en-bresse@justice.fr'
    lieuAvantMaj.horaire = 'Lundi 9h00 à 12h00 et de 13h30 à 17h00\nMardi 9h00 à 12h00 et de 13h30 à 17h00\nMercredi 9h00 à 12h00 et de 13h30 à 17h00\nJeudi 9h00 à 12h00 et de 13h30 à 17h00\nVendredi 9h00 à 12h00 et de 13h30 à 17h00'
    lieuAvantMaj.departement = 'Ain'
    lieuAvantMaj.region = 'Auvergne-Rhône-Alpes'
    lieuAvantMaj.pmr = true
    lieuAvantMaj.pmr_assiste = true
    lieuAvantMaj.visuel = true
    lieuAvantMaj.bim = false
    lieuAvantMaj.lsf = false
    lieuAvantMaj.calme = true
    lieuAvantMaj.forme = false
    lieuAvantMaj.commentaire = 'En partie formé'
    await lieuRepository.insert([lieuAvantMaj])
    const sheets = { spreadsheets: { values: { get: jest.fn(() => ({ data: { values: [lieu1] } })) } } }
    const googleApis = { sheets: jest.fn(() => sheets) }

    // WHEN
    // @ts-ignore
    await majDesLieux(orm, googleApis)

    // THEN
    const lieuxQuery = await lieuRepository.find()
    expect(lieuxQuery).toStrictEqual([maisonDeJustice()])
  })
})

function maisonDeJustice(): LieuModel {
  const lieu = new LieuModel()
  lieu.id = 1
  lieu.nom = 'Maison de Justice et du Droit de Bourg en Bresse'
  lieu.adresse = '34 cours de Verdun'
  lieu.codePostal = '1000'
  lieu.ville = 'Bourg En Bresse'
  lieu.siteInternet = 'https://www.ain.gouv.fr/maison-de-la-justice-et-du-droit-a6099.html'
  lieu.telephone = '04 74 14 01 40'
  lieu.priseDeRendezVous = 'OUI'
  lieu.domaineDeDroit = 'TOUT DOMAINES'
  lieu.latitude = 46.2064358
  lieu.longitude = 5.2272134
  lieu.e_mail = 'mjd.bourg-en-bresse@justice.fr'
  lieu.horaire = 'Lundi 9h00 à 12h00 et de 13h30 à 17h00\nMardi 9h00 à 12h00 et de 13h30 à 17h00\nMercredi 9h00 à 12h00 et de 13h30 à 17h00\nJeudi 9h00 à 12h00 et de 13h30 à 17h00\nVendredi 9h00 à 12h00 et de 13h30 à 17h00'
  lieu.departement = 'Ain'
  lieu.region = 'Auvergne-Rhône-Alpes'
  lieu.pmr = true
  lieu.pmr_assiste = true
  lieu.visuel = true
  lieu.bim = false
  lieu.lsf = false
  lieu.calme = true
  lieu.forme = false
  lieu.commentaire = 'En partie formé'

  return lieu
}
