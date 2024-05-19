import { DataSource } from 'typeorm'

import { LieuModel } from '../../../database/models/LieuModel'
import { Critere } from '../../entities/Critere'
import { Lieu } from '../../entities/Lieu'
import { LieuLoader } from '../../entities/LieuLoader'

export class PostgreSQLLieuLoader implements LieuLoader {
  // Formule simplifiée pour calculer une distance en km à partir
  // de coordonnées latidude/longitude :
  // R * acos(sin(a) * sin(b) + cos(a) * cos(b) * cos(c - d))
  // avec R = rayon de la Terre
  // a = latitudePointA, b = latitudePointB
  // c = longitudePointA, d = longitudePointB
  // les latitudes et longitudes sont en radians, pas en degrés
  // https://forums.futura-sciences.com/mathematiques-superieur/306536-calcul-de-distance-entre-2-points-dont-jai-coordonnees-geographiques-longitude-latitude.html
  private readonly calculDistanceSQL: string
  private readonly orm: Promise<DataSource>
  private lieuxModel: Array<LieuModel>

  constructor(orm: Promise<DataSource>) {
    this.calculDistanceSQL = '6371 * ACOS(SIN(RADIANS(latitude)) * SIN(RADIANS($1)) + COS(RADIANS(latitude)) * COS(RADIANS($1)) * COS(RADIANS(longitude) - RADIANS($2)))'
    this.orm = orm
    this.lieuxModel = []
  }

  async recupereUnLieu(id: number, latitude: number, longitude: number): Promise<ReadonlyArray<Lieu>> {
    this.lieuxModel = await (await this.orm).manager.findBy(LieuModel, { id })

    this.ajouteLaDistance(latitude, longitude)

    return this.transformeEnLieu()
  }

  async recupereDesLieux(
    latitude: number,
    longitude: number,
    criteres: Set<Critere>,
    page = 0,
    nombreDeLieuxAffichesParPage = 10,
    rayonDeRecherche = Infinity
  ): Promise<{ lieux: ReadonlyArray<Lieu>, nombreDeResultat: number }> {
    this.lieuxModel = await this.getLieux(latitude, longitude, rayonDeRecherche, page, nombreDeLieuxAffichesParPage, criteres)

    return {
      lieux: this.transformeEnLieu(),
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

    const query = await (await this.orm).manager
      .query<ReadonlyArray<{ count: string }>>(`SELECT COUNT(*) FROM lieu WHERE ${this.calculDistanceSQL} < ${rayonDeRecherche === Infinity ? "'+Infinity'" : rayonDeRecherche} ${criteresSQL}`, [
        latitude,
        longitude,
      ])

    return Number(query[0].count)
  }

  private async getLieux(
    latitude: number,
    longitude: number,
    rayonDeRecherche: number,
    page: number,
    nombreDeLieuxAffichesParPage: number,
    criteres: Set<Critere>
  ): Promise<Array<LieuModel>> {
    const criteresSQL = this.getCriteres(criteres)

    return (await this.orm).manager
      .query<Array<LieuModel>>(`SELECT *, code_postal AS "codePostal", domaine_de_droit AS "domaineDeDroit", e_mail AS "eMail", prise_de_rendez_vous AS "priseDeRendezVous", site_internet AS "siteInternet", ${this.calculDistanceSQL} AS distance FROM lieu WHERE ${this.calculDistanceSQL} < ${rayonDeRecherche === Infinity ? "'+Infinity'" : rayonDeRecherche} ${criteresSQL} ORDER BY distance ASC LIMIT $3 OFFSET $4`, [
        latitude,
        longitude,
        nombreDeLieuxAffichesParPage,
        page * nombreDeLieuxAffichesParPage,
      ])
  }

  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  private getCriteres(criteres: Set<Critere>): string {
    return [...criteres]
      .map((critere: string): string => ` AND ${critere} = true`)
      .join('')
  }

  private transformeEnLieu(): Array<Lieu> {
    return this.lieuxModel.map((lieuModel): Lieu => {
      return Lieu.cree({
        adresse: lieuModel.adresse,
        codePostal: lieuModel.codePostal,
        commentaire: lieuModel.commentaire,
        criteres: {
          bim: lieuModel.bim,
          calme: lieuModel.calme,
          forme: lieuModel.forme,
          lsf: lieuModel.lsf,
          pmr: lieuModel.pmr,
          pmr_assiste: lieuModel.pmr_assiste,
          visuel: lieuModel.visuel,
        },
        departement: lieuModel.departement,
        distance: lieuModel.distance,
        domaineDeDroit: lieuModel.domaineDeDroit,
        eMail: lieuModel.eMail,
        horaire: lieuModel.horaire,
        id: lieuModel.id,
        latitude: lieuModel.latitude,
        longitude: lieuModel.longitude,
        nom: lieuModel.nom,
        priseDeRendezVous: lieuModel.priseDeRendezVous,
        region: lieuModel.region,
        siteInternet: lieuModel.siteInternet,
        telephone: lieuModel.telephone,
        ville: lieuModel.ville,
      })
    })
  }

  private ajouteLaDistance(latitude: number, longitude: number) {
    const degreesToRadians = (degrees: number): number => degrees * (Math.PI / 180)

    this.lieuxModel = this.lieuxModel.map((lieuModel: LieuModel): LieuModel => {
      return {
        ...lieuModel,
        distance: 6371 * Math.acos(
          Math.sin(degreesToRadians(lieuModel.latitude)) *
          Math.sin(degreesToRadians(latitude)) +
          Math.cos(degreesToRadians(lieuModel.latitude)) *
          Math.cos(degreesToRadians(latitude)) *
          Math.cos(degreesToRadians(lieuModel.longitude) - degreesToRadians(longitude))
        ),
      }
    })
  }
}
