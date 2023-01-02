import { Lieu } from './Lieu'

export class LieuBuilder {
  public static cree(champsSurchargés?: Partial<Lieu>): Lieu {
    return {
      adresse: champsSurchargés?.adresse || '34 cours de Verdun',
      bim: champsSurchargés?.bim || false,
      calme: champsSurchargés?.calme || true,
      codePostal: champsSurchargés?.codePostal || '1000',
      commentaire: champsSurchargés?.commentaire || 'En partie formé',
      departement: champsSurchargés?.departement || 'Ain',
      distance: champsSurchargés?.distance || 26.000000000000245,
      domaineDeDroit: champsSurchargés?.domaineDeDroit || 'TOUT DOMAINES',
      e_mail: champsSurchargés?.e_mail || 'mjd.bourg-en-bresse@example.com',
      forme: champsSurchargés?.forme || false,
      horaire: champsSurchargés?.horaire || 'Lundi 9h00 à 12h00 et de 13h30 à 17h00\nMardi 9h00 à 12h00 et de 13h30 à 17h00\nMercredi 9h00 à 12h00 et de 13h30 à 17h00\nJeudi 9h00 à 12h00 et de 13h30 à 17h00\nVendredi 9h00 à 12h00 et de 13h30 à 17h00',
      id: champsSurchargés?.id || 1,
      latitude: champsSurchargés?.latitude || 46.2064358,
      longitude: champsSurchargés?.longitude || 5.2272134,
      lsf: champsSurchargés?.lsf || false,
      nom: champsSurchargés?.nom || 'Maison de Justice et du Droit de Bourg en Bresse',
      pmr: champsSurchargés?.pmr || true,
      pmr_assiste: champsSurchargés?.pmr_assiste || true,
      priseDeRendezVous: champsSurchargés?.priseDeRendezVous || 'OUI',
      region: champsSurchargés?.region || 'Auvergne-Rhône-Alpes',
      siteInternet: champsSurchargés?.siteInternet || 'https://www.ain.gouv.fr/',
      telephone: champsSurchargés?.telephone || '04 74 14 01 40',
      ville: champsSurchargés?.ville || 'Bourg En Bresse',
      visuel: champsSurchargés?.visuel || true,
    }
  }
}
