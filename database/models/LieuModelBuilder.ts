import { LieuModel } from './LieuModel'

export class LieuModelBuilder {
  public static cree(champsSurcharges?: Partial<LieuModel>): LieuModel {
    const lieu = new LieuModel()
    lieu.id = champsSurcharges?.id || 1
    lieu.nom = champsSurcharges?.nom || 'Maison de Justice et du Droit de Bourg en Bresse'
    lieu.adresse = champsSurcharges?.adresse || '34 cours de Verdun'
    lieu.codePostal = champsSurcharges?.codePostal || '1000'
    lieu.ville = champsSurcharges?.ville || 'Bourg En Bresse'
    lieu.siteInternet = champsSurcharges?.siteInternet || 'https://www.ain.gouv.fr/'
    lieu.telephone = champsSurcharges?.telephone || '04 74 14 01 40'
    lieu.priseDeRendezVous = champsSurcharges?.priseDeRendezVous || 'OUI\nmais pas le dimanche'
    lieu.domaineDeDroit = champsSurcharges?.domaineDeDroit || 'TOUT DOMAINES'
    lieu.latitude = champsSurcharges?.latitude || 46.2064358
    lieu.longitude = champsSurcharges?.longitude || 5.2272134
    lieu.eMail = champsSurcharges?.eMail || 'mjd.bourg-en-bresse@example.com'
    lieu.horaire = champsSurcharges?.horaire || 'Lundi 9h00 à 12h00 et de 13h30 à 17h00\nMardi 9h00 à 12h00 et de 13h30 à 17h00\nMercredi 9h00 à 12h00 et de 13h30 à 17h00\nJeudi 9h00 à 12h00 et de 13h30 à 17h00\nVendredi 9h00 à 12h00 et de 13h30 à 17h00'
    lieu.departement = champsSurcharges?.departement || 'Ain'
    lieu.region = champsSurcharges?.region || 'Auvergne-Rhône-Alpes'
    lieu.pmr = champsSurcharges?.pmr || true
    lieu.pmr_assiste = champsSurcharges?.pmr_assiste || true
    lieu.visuel = champsSurcharges?.visuel || true
    lieu.bim = champsSurcharges?.bim || false
    lieu.lsf = champsSurcharges?.lsf || false
    lieu.calme = champsSurcharges?.calme || false
    lieu.forme = champsSurcharges?.forme || false
    lieu.commentaire = champsSurcharges?.commentaire !== undefined ? champsSurcharges.commentaire : 'En partie\nformé'
    return lieu
  }
}
