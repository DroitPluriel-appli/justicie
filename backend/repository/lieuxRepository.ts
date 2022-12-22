import dataSource from '../../database/dataSource'
import { LieuModel } from '../../database/models/EntitéJuridiqueModel'

export async function recupereDesLieux() {
  const orm = dataSource.initialize()
  const lieuxModel = await (await orm)
    .getRepository(LieuModel)
    .find()
  await (await orm).destroy()

  const lieux = lieuxModel.map((lieu) => ({
    adresse: lieu.adresse,
    bim: lieu.bim,
    calme: lieu.calme,
    codePostal: lieu.codePostal,
    commentaire: lieu.commentaire,
    departement: lieu.departement,
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

  return lieux
}
