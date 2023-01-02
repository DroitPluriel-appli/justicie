import { GoogleApis, sheets_v4 } from 'googleapis'
import { DataSource, EntityManager } from 'typeorm'

import dataSource from '../../../database/dataSource'
import { LieuModel } from '../../../database/models/LieuModel'

type LieuSansId = Omit<LieuModel, 'id'>

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

async function sauvegardeLesLieux(orm: Promise<DataSource>, lieux: LieuSansId[]): Promise<void> {
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

function transformeEnLieuxModel(lieuxBruts: string[][]): LieuSansId[] {
  const stringToBoolean = (str: string): boolean => str === 'oui' ? true : false

  return lieuxBruts.map((lieu): LieuSansId => ({
    adresse: lieu[1],
    bim: stringToBoolean(lieu[18]),
    calme: stringToBoolean(lieu[20]),
    codePostal: lieu[2],
    commentaire: lieu[22],
    departement: lieu[13],
    domaineDeDroit: lieu[7],
    e_mail: lieu[10],
    forme: stringToBoolean(lieu[21]),
    horaire: lieu[11],
    latitude: Number(lieu[8]),
    longitude: Number(lieu[9]),
    lsf: stringToBoolean(lieu[19]),
    nom: lieu[0],
    pmr: stringToBoolean(lieu[15]),
    pmr_assiste: stringToBoolean(lieu[16]),
    priseDeRendezVous: lieu[6],
    region: lieu[14],
    siteInternet: lieu[4],
    telephone: lieu[5],
    ville: lieu[3],
    visuel: stringToBoolean(lieu[17]),
  }))
}

async function main() {
  const orm = dataSource.initialize()
  await majDesLieux(orm, new GoogleApis())
  await (await orm).destroy()
}

void main()
