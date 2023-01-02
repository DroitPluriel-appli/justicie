import { DataSource } from 'typeorm'

import { LieuModel } from '../../../database/models/LieuModel'
import { Lieu } from '../../entities/Lieu'

export async function recupereDesLieux(
  orm: Promise<DataSource>,
  latitude: number,
  longitude: number,
  page = 0,
  nombreDeLieuxAffichesParPage = 10
): Promise<Lieu[]> {
  const vingtKilometres = 0.2
  const lieuxModel = await (await orm)
    .getRepository(LieuModel)
    .query('SELECT *, code_postal AS "codePostal", domaine_de_droit AS "domaineDeDroit", prise_de_rendez_vous AS "priseDeRendezVous", site_internet AS "siteInternet", ABS(latitude - $1) + ABS(longitude - $2) AS distance FROM lieu WHERE (latitude BETWEEN $3 AND $4 AND longitude BETWEEN $5 AND $6) ORDER BY distance ASC LIMIT $7 OFFSET $8', [
      latitude,
      longitude,
      latitude - vingtKilometres,
      latitude + vingtKilometres,
      longitude - vingtKilometres,
      longitude + vingtKilometres,
      nombreDeLieuxAffichesParPage,
      page * nombreDeLieuxAffichesParPage,
    ]) as LieuModel[]

  return _transformeEnLieu(lieuxModel)
}

function _transformeEnLieu(lieuxModel: LieuModel[]): Lieu[] {
  return lieuxModel.map((lieu): Lieu => ({
    adresse: lieu.adresse,
    bim: lieu.bim,
    calme: lieu.calme,
    codePostal: lieu.codePostal,
    commentaire: lieu.commentaire,
    departement: lieu.departement,
    distance: lieu.distance as number * 100,
    domaineDeDroit: lieu.domaineDeDroit,
    e_mail: lieu.e_mail,
    forme: lieu.forme,
    horaire: lieu.horaire,
    id: lieu.id,
    latitude: lieu.latitude,
    longitude: lieu.longitude,
    lsf: lieu.lsf,
    nom: lieu.nom,
    pmr: lieu.pmr,
    pmr_assiste: lieu.pmr_assiste,
    priseDeRendezVous: lieu.priseDeRendezVous,
    region: lieu.region,
    siteInternet: lieu.siteInternet,
    telephone: lieu.telephone,
    ville: lieu.ville,
    visuel: lieu.visuel,
  }))
}
