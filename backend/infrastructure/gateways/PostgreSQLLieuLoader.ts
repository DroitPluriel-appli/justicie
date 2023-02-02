import { DataSource } from 'typeorm'

import { LieuModel } from '../../../database/models/LieuModel'
import { Critere } from '../../entities/Critere'
import { Lieu } from '../../entities/Lieu'
import { LieuLoader } from '../../entities/LieuLoader'

export class PostgreSQLLieuLoader implements LieuLoader {
  readonly multiplicateurLatitude = 111
  readonly multiplicateurLongitude = 80

  constructor(private readonly orm: Promise<DataSource>) { }

  async recupereUnLieu(id: number, latitude: number, longitude: number): Promise<Lieu[]> {
    const lieuxModel = await (await this.orm)
      .getRepository(LieuModel)
      .findBy({ id })

    return this.transformeEnLieu(this.ajouteLaDistance(lieuxModel, latitude, longitude))
  }

  async recupereDesLieux(
    latitude: number,
    longitude: number,
    criteres: Set<Critere>,
    page = 0,
    nombreDeLieuxAffichesParPage = 10,
    rayonDeRecherche = Infinity
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
      .query(`SELECT COUNT(*) FROM lieu WHERE 6371 * ACOS(SIN(RADIANS(latitude)) * SIN(RADIANS($1)) + COS(RADIANS(latitude)) * COS(RADIANS($1)) * COS(RADIANS(longitude) - RADIANS($2))) < ${rayonDeRecherche === Infinity ? 100_000 : rayonDeRecherche} ${criteresSQL}`, [
        latitude,
        longitude,
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

    // 6371 * ACOS(SIN(RADIANS(latitude)) * SIN(RADIANS($1)) + COS(RADIANS(latitude)) * COS(RADIANS($1)) * COS(RADIANS(longitude) - RADIANS($2)))

    return await (await this.orm)
      .getRepository(LieuModel)
      .query(`SELECT *, code_postal AS "codePostal", domaine_de_droit AS "domaineDeDroit", e_mail AS "eMail", prise_de_rendez_vous AS "priseDeRendezVous", site_internet AS "siteInternet", 6371 * ACOS(SIN(RADIANS(latitude)) * SIN(RADIANS($1)) + COS(RADIANS(latitude)) * COS(RADIANS($1)) * COS(RADIANS(longitude) - RADIANS($2))) AS distance FROM lieu WHERE 6371 * ACOS(SIN(RADIANS(latitude)) * SIN(RADIANS($1)) + COS(RADIANS(latitude)) * COS(RADIANS($1)) * COS(RADIANS(longitude) - RADIANS($2))) < ${rayonDeRecherche === Infinity ? 100_000 : rayonDeRecherche} ${criteresSQL} ORDER BY distance ASC LIMIT $3 OFFSET $4`, [
        latitude,
        longitude,
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
    const degreesToRadians = (degrees: number) => degrees * (Math.PI / 180)
    return lieuxModel.map((lieuModel) => {
      return {
        ...lieuModel,
        distance: 6371 * Math.acos(
          Math.sin(degreesToRadians(lieuModel.latitude) *
            Math.sin(degreesToRadians(latitude))) +
          Math.cos(degreesToRadians(lieuModel.latitude) *
            Math.cos(degreesToRadians(latitude))) *
          Math.cos(degreesToRadians(lieuModel.longitude) - degreesToRadians(longitude))
        ),
      }
    })
  }
}
