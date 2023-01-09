import { LieuModel } from './LieuModel'

export class LieuModelBuilder {
  public static cree(champsSurchargés?: Partial<LieuModel>): LieuModel {
    const lieu = new LieuModel()
    lieu.id = champsSurchargés?.id || 1
    lieu.nom = champsSurchargés?.nom || 'Maison de Justice et du Droit de Bourg en Bresse'
    lieu.adresse = champsSurchargés?.adresse || '34 cours de Verdun'
    lieu.codePostal = champsSurchargés?.codePostal || '1000'
    lieu.ville = champsSurchargés?.ville || 'Bourg En Bresse'
    lieu.siteInternet = champsSurchargés?.siteInternet || 'https://www.ain.gouv.fr/'
    lieu.telephone = champsSurchargés?.telephone || '04 74 14 01 40'
    lieu.priseDeRendezVous = champsSurchargés?.priseDeRendezVous || 'OUI\nmais pas le dimanche'
    lieu.domaineDeDroit = champsSurchargés?.domaineDeDroit || 'TOUT DOMAINES'
    lieu.latitude = champsSurchargés?.latitude || 46.2064358
    lieu.longitude = champsSurchargés?.longitude || 5.2272134
    lieu.eMail = champsSurchargés?.eMail || 'mjd.bourg-en-bresse@example.com'
    lieu.horaire = champsSurchargés?.horaire || 'Lundi 9h00 à 12h00 et de 13h30 à 17h00\nMardi 9h00 à 12h00 et de 13h30 à 17h00\nMercredi 9h00 à 12h00 et de 13h30 à 17h00\nJeudi 9h00 à 12h00 et de 13h30 à 17h00\nVendredi 9h00 à 12h00 et de 13h30 à 17h00'
    lieu.departement = champsSurchargés?.departement || 'Ain'
    lieu.region = champsSurchargés?.region || 'Auvergne-Rhône-Alpes'
    lieu.pmr = champsSurchargés?.pmr || true
    lieu.pmr_assiste = champsSurchargés?.pmr_assiste || true
    lieu.visuel = champsSurchargés?.visuel || true
    lieu.bim = champsSurchargés?.bim || false
    lieu.lsf = champsSurchargés?.lsf || false
    lieu.calme = champsSurchargés?.calme || false
    lieu.forme = champsSurchargés?.forme || false
    lieu.commentaire = champsSurchargés?.commentaire || 'En partie\nformé'
    return lieu
  }
}
