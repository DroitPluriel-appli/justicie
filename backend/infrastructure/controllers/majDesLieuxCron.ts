import { GoogleApis, sheets_v4 } from 'googleapis'
import { DataSource, EntityManager } from 'typeorm'

import dataSource from '../../../database/dataSource'
import { LieuModel } from '../../../database/models/LieuModel'

export async function majDesLieux(orm: Promise<DataSource>, googleApis: GoogleApis): Promise<void> {
  const lieuxBruts = await recupereLesLieuxDeSpreadsheet(googleApis)

  const lieuxModel = transformeEnLieuxModel(lieuxBruts)

  await sauvegardeLesLieux(orm, lieuxModel)
}

async function recupereLesLieuxDeSpreadsheet(googleApis: GoogleApis): Promise<string[][]> {
  const options: sheets_v4.Options = { auth: process.env.SPREADSHEET_AUTH, version: 'v4' }
  const sheets = googleApis.sheets(options)

  const request: sheets_v4.Params$Resource$Spreadsheets$Values$Get = {
    majorDimension: 'ROWS',
    range: 'Production!A2:ZZ',
    spreadsheetId: process.env.SPREADSHEET_ID,
  }
  const response = await sheets.spreadsheets.values.get(request)

  return response.data.values as string[][]
}

async function sauvegardeLesLieux(orm: Promise<DataSource>, lieux: LieuModel[]): Promise<void> {
  await (await orm).transaction(async (transactionalEntityManager: EntityManager): Promise<void> => {
    await transactionalEntityManager
      .getRepository(LieuModel)
      .clear()
    await transactionalEntityManager
      .getRepository(LieuModel)
      .query('ALTER SEQUENCE lieu_id_seq RESTART WITH 1')
    await transactionalEntityManager
      .getRepository(LieuModel)
      .save(lieux)
  })
}

function transformeEnLieuxModel(lieuxBruts: string[][]): LieuModel[] {
  const stringToBoolean = (str: string): boolean => str === 'oui' ? true : false

  return lieuxBruts.map((lieu): LieuModel => {
    const lieuModel = new LieuModel()
    lieuModel.adresse = lieu[1]
    lieuModel.bim = stringToBoolean(lieu[18])
    lieuModel.calme = stringToBoolean(lieu[20])
    lieuModel.codePostal = lieu[2]
    // Si la colonne commentaire sur la spreadsheets est vide ET que la colonne d'après aussi
    // alors l'API ne me renvoit pas une chaine vide...
    lieuModel.commentaire = lieu[22] === undefined ? '' : lieu[22]
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

async function main() {
  const orm = dataSource.initialize()
  await majDesLieux(orm, new GoogleApis())
  await (await orm).destroy()
}

void main()
