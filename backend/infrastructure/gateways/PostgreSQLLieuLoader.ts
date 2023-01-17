import { DataSource } from 'typeorm'

import { LieuModel } from '../../../database/models/LieuModel'
import { Critere } from '../../entities/Critere'
import { Lieu } from '../../entities/Lieu'
import { LieuLoader } from '../../entities/LieuLoader'

export class PostgreSQLLieuLoader implements LieuLoader {

  constructor(private readonly orm: Promise<DataSource>) { }

  async recupereUnLieu(id: number, latitude = 0, longitude = 0): Promise<Lieu[]> {
    const lieuxModel = await (await this.orm)
      .getRepository(LieuModel)
      .findBy({ id })

    return this.transformeEnLieu(this.ajouteLaDistance(lieuxModel, latitude, longitude))
  }

  async recupereDesLieux(
    latitude: number,
    longitude: number,
    rayonDeRecherche = Infinity,
    page = 0,
    nombreDeLieuxAffichesParPage = 10,
    criteres = new Set<Critere>()
  ): Promise<{ lieux: Lieu[], nombreDeResultat: number }> {
    const lieuxModel = await this.getLieux(latitude, longitude, rayonDeRecherche, page, nombreDeLieuxAffichesParPage, criteres)

    return {
      lieux: this.transformeEnLieu(lieuxModel),
      nombreDeResultat: await this.getNombreDeResultat(latitude, longitude, rayonDeRecherche, criteres),
    }
  }

  private async getNombreDeResultat(
    latitude: number,
    longitude: number,
    rayonDeRecherche: number,
    criteres: Set<Critere>
  ): Promise<number> {
    const criteresSQL = this.getCriteres(criteres)

    const query = await (await this.orm)
      .getRepository(LieuModel)
      .query(`SELECT COUNT(*) FROM lieu WHERE (latitude BETWEEN $1 AND $2 AND longitude BETWEEN $3 AND $4) ${criteresSQL}`, [
        latitude - rayonDeRecherche,
        latitude + rayonDeRecherche,
        longitude - rayonDeRecherche,
        longitude + rayonDeRecherche,
      ]) as { count: string }[]

    return Number(query[0].count)
  }

  private async getLieux(
    latitude: number,
    longitude: number,
    rayonDeRecherche: number,
    page: number,
    nombreDeLieuxAffichesParPage: number,
    criteres: Set<Critere>
  ): Promise<LieuModel[]> {
    const criteresSQL = this.getCriteres(criteres)

    return await (await this.orm)
      .getRepository(LieuModel)
      .query(`SELECT *, code_postal AS "codePostal", domaine_de_droit AS "domaineDeDroit", e_mail AS "eMail", prise_de_rendez_vous AS "priseDeRendezVous", site_internet AS "siteInternet", ABS(latitude - $1) + ABS(longitude - $2) AS distance FROM lieu WHERE (latitude BETWEEN $3 AND $4 AND longitude BETWEEN $5 AND $6) ${criteresSQL} ORDER BY distance ASC LIMIT $7 OFFSET $8`, [
        latitude,
        longitude,
        latitude - rayonDeRecherche,
        latitude + rayonDeRecherche,
        longitude - rayonDeRecherche,
        longitude + rayonDeRecherche,
        nombreDeLieuxAffichesParPage,
        page * nombreDeLieuxAffichesParPage,
      ]) as LieuModel[]
  }

  private getCriteres(criteres: Set<Critere>): string {
    return [...criteres]
      .map((critere: string): string => ` AND ${critere} = true`)
      .join('')
  }

  private transformeEnLieu(lieuxModel: LieuModel[]): Lieu[] {
    return lieuxModel.map((lieuModel): Lieu => {
      return new Lieu(
        lieuModel.adresse,
        lieuModel.codePostal,
        lieuModel.commentaire,
        {
          bim: lieuModel.bim,
          calme: lieuModel.calme,
          forme: lieuModel.forme,
          lsf: lieuModel.lsf,
          pmr: lieuModel.pmr,
          pmr_assiste: lieuModel.pmr_assiste,
          visuel: lieuModel.visuel,
        },
        lieuModel.departement,
        Number(lieuModel.distance),
        lieuModel.domaineDeDroit,
        lieuModel.eMail,
        lieuModel.horaire,
        lieuModel.id,
        lieuModel.latitude,
        lieuModel.longitude,
        lieuModel.nom,
        lieuModel.priseDeRendezVous,
        lieuModel.region,
        lieuModel.siteInternet,
        lieuModel.telephone,
        lieuModel.ville
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
