import { sheets_v4 } from '@googleapis/sheets'
import { DataSource } from 'typeorm'

import { LieuModel } from '../../../database/models/LieuModel'

export async function importeDesLieux(orm: Promise<DataSource>, sheets: (options: sheets_v4.Options) => sheets_v4.Sheets): Promise<void> {
  const lieuxBruts = await recupereLesLieuxDeSpreadsheet(sheets)

  const lieuxModel = transformeEnLieuxModel(lieuxBruts)

  await sauvegardeLesLieux(orm, lieuxModel)
}

async function recupereLesLieuxDeSpreadsheet(sheets: (options: sheets_v4.Options) => sheets_v4.Sheets): Promise<ReadonlyArray<ReadonlyArray<string>>> {
  const options: sheets_v4.Options = { auth: process.env.SPREADSHEET_AUTH, version: 'v4' }

  const request: sheets_v4.Params$Resource$Spreadsheets$Values$Get = {
    majorDimension: 'ROWS',
    range: 'Production!A2:ZZ',
    spreadsheetId: process.env.SPREADSHEET_ID,
  }
  const response = await sheets(options).spreadsheets.values.get(request)

  return response.data.values as ReadonlyArray<ReadonlyArray<string>>
}

function transformeEnLieuxModel(lieuxBruts: ReadonlyArray<ReadonlyArray<string>>): ReadonlyArray<LieuModel> {
  const stringToBoolean = (str: string): boolean => str === 'oui'

  return lieuxBruts.map((lieu: ReadonlyArray<string>): LieuModel => {
    const lieuModel = new LieuModel()
    lieuModel.adresse = lieu[1]
    lieuModel.bim = stringToBoolean(lieu[18])
    lieuModel.calme = stringToBoolean(lieu[20])
    lieuModel.codePostal = lieu[2]
    // Si la colonne commentaire sur la spreadsheets est vide ET que la colonne d'après aussi
    // alors l'API ne me renvoit pas une chaine vide...
    lieuModel.commentaire = lieu[22] ?? ''
    lieuModel.departement = lieu[13]
    lieuModel.domaineDeDroit = lieu[7]
    lieuModel.eMail = lieu[10]
    lieuModel.forme = stringToBoolean(lieu[21])
    lieuModel.horaire = lieu[11]
    lieuModel.latitude = Number(lieu[8])
    lieuModel.longitude = Number(lieu[9])
    lieuModel.lsf = stringToBoolean(lieu[19])
    lieuModel.nom = lieu[0]
    lieuModel.pmr = stringToBoolean(lieu[15])
    lieuModel.pmr_assiste = stringToBoolean(lieu[16])
    lieuModel.priseDeRendezVous = lieu[6]
    lieuModel.region = lieu[14]
    lieuModel.siteInternet = lieu[4]
    lieuModel.telephone = lieu[5]
    lieuModel.ville = lieu[3]
    lieuModel.visuel = stringToBoolean(lieu[17])
    return lieuModel
  })
}

async function sauvegardeLesLieux(orm: Promise<DataSource>, lieux: ReadonlyArray<LieuModel>): Promise<void> {
  await (await orm).manager.clear(LieuModel)
  await (await orm).manager.query('ALTER SEQUENCE lieu_id_seq RESTART WITH 1')
  // Stryker disable next-line all
  await (await orm).manager.save(lieux, { transaction: process.env.NODE_ENV !== 'test' })
}
