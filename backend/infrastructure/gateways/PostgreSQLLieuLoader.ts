import { DataSource } from 'typeorm'

import { Critere } from '../../../configuration/criteres'
import { LieuModel } from '../../../database/models/LieuModel'
import { Lieu } from '../../entities/Lieu'
import { LieuLoader } from '../../entities/LieuLoader'

export class PostgreSQLLieuLoader implements LieuLoader {
  private readonly vingtKilometres = 0.2

  constructor(private readonly orm: Promise<DataSource>) {}

  async recupereUnLieu(id: number, latitude = 0, longitude = 0): Promise<Lieu[]> {
    const lieuxModel = await (await this.orm)
      .getRepository(LieuModel)
      .findBy({ id })

    return this.transformeEnLieu(this.ajouteLaDistance(lieuxModel, latitude, longitude))
  }

  // @ts-ignore
  async recupereDesLieux(
    latitude: number,
    longitude: number,
    page = 0,
    nombreDeLieuxAffichesParPage = 10,
    accessibilites = []
  ): Promise<{ lieux: Lieu[], nombreDeResultat: number }> {
    // @ts-ignore
    const lieuxModel = await this.getLieux(latitude, longitude, page, nombreDeLieuxAffichesParPage, accessibilites)

    return {
      lieux: this.transformeEnLieu(lieuxModel),
      // @ts-ignore
      nombreDeResultat: await this.getNombreDeResultat(latitude, longitude, accessibilites),
    }
  }

  private async getNombreDeResultat(
    latitude: number,
    longitude: number,
    accessibilites: keyof Critere['name'][] | []
  ): Promise<number> {
    const accessibilitesSQL = this.getAccessibilites(accessibilites)

    const query = await (await this.orm)
      .getRepository(LieuModel)
      .query(`SELECT COUNT(*) FROM lieu WHERE (latitude BETWEEN $1 AND $2 AND longitude BETWEEN $3 AND $4) ${accessibilitesSQL}`, [
        latitude - this.vingtKilometres,
        latitude + this.vingtKilometres,
        longitude - this.vingtKilometres,
        longitude + this.vingtKilometres,
      ]) as { count: string }[]

    return Number(query[0].count)
  }

  private async getLieux(
    latitude: number,
    longitude: number,
    page: number,
    nombreDeLieuxAffichesParPage: number,
    accessibilites: keyof Critere['name'][] | []
  ): Promise<LieuModel[]> {
    const accessibilitesSQL = this.getAccessibilites(accessibilites)

    return await (await this.orm)
      .getRepository(LieuModel)
      .query(`SELECT *, code_postal AS "codePostal", domaine_de_droit AS "domaineDeDroit", e_mail AS "eMail", prise_de_rendez_vous AS "priseDeRendezVous", site_internet AS "siteInternet", ABS(latitude - $1) + ABS(longitude - $2) AS distance FROM lieu WHERE (latitude BETWEEN $3 AND $4 AND longitude BETWEEN $5 AND $6) ${accessibilitesSQL} ORDER BY distance ASC LIMIT $7 OFFSET $8`, [
        latitude,
        longitude,
        latitude - this.vingtKilometres,
        latitude + this.vingtKilometres,
        longitude - this.vingtKilometres,
        longitude + this.vingtKilometres,
        nombreDeLieuxAffichesParPage,
        page * nombreDeLieuxAffichesParPage,
      ]) as LieuModel[]
  }

  private getAccessibilites(accessibilites: keyof Critere['name'][] | []): string {
    // eslint-disable-next-line
    return accessibilites
      // @ts-ignore
      // eslint-disable-next-line
      .map((accessibilite) => ` AND ${accessibilite} = true`)
      .join('')
  }

  private transformeEnLieu(lieuxModel: LieuModel[]): Lieu[] {
    return lieuxModel.map((lieuModel): Lieu => {
      return new Lieu(
        lieuModel.adresse,
        lieuModel.bim,
        lieuModel.calme,
        lieuModel.codePostal,
        lieuModel.commentaire,
        lieuModel.departement,
        Number((lieuModel.distance as number * 100).toPrecision(2)),
        lieuModel.domaineDeDroit,
        lieuModel.eMail,
        lieuModel.forme,
        lieuModel.horaire,
        lieuModel.id,
        lieuModel.latitude,
        lieuModel.longitude,
        lieuModel.lsf,
        lieuModel.nom,
        lieuModel.pmr,
        lieuModel.pmr_assiste,
        lieuModel.priseDeRendezVous,
        lieuModel.region,
        lieuModel.siteInternet,
        lieuModel.telephone,
        lieuModel.ville,
        lieuModel.visuel
      )
    })
  }

  private ajouteLaDistance(lieuxModel: LieuModel[], latitude: number, longitude: number) {
    return lieuxModel.map((lieuModel) => {
      return {
        ...lieuModel,
        distance: Math.abs(lieuModel.latitude - latitude) + Math.abs(lieuModel.longitude - longitude),
      }
    })
  }
}
