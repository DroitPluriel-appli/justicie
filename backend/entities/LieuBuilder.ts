import { Lieu } from './Lieu'

export class LieuBuilder {
  public static cree(champsSurchargés?: Partial<Lieu>): Lieu {
    return new Lieu(
      champsSurchargés?.adresse || '34 cours de Verdun',
      champsSurchargés?.codePostal || '1000',
      champsSurchargés?.commentaire || 'En partie\nformé',
      champsSurchargés?.criteres || {
        bim: false,
        calme: false,
        forme: false,
        lsf: false,
        pmr: true,
        pmr_assiste: true,
        visuel: true,
      },
      champsSurchargés?.departement || 'Ain',
      champsSurchargés?.distance || 0.26000000000000245,
      champsSurchargés?.domaineDeDroit || 'TOUT DOMAINES',
      champsSurchargés?.eMail || 'mjd.bourg-en-bresse@example.com',
      champsSurchargés?.horaire || 'Lundi 9h00 à 12h00 et de 13h30 à 17h00\nMardi 9h00 à 12h00 et de 13h30 à 17h00\nMercredi 9h00 à 12h00 et de 13h30 à 17h00\nJeudi 9h00 à 12h00 et de 13h30 à 17h00\nVendredi 9h00 à 12h00 et de 13h30 à 17h00',
      champsSurchargés?.id || 1,
      champsSurchargés?.latitude || 46.2064358,
      champsSurchargés?.longitude || 5.2272134,
      champsSurchargés?.nom || 'Maison de Justice et du Droit de Bourg en Bresse',
      champsSurchargés?.priseDeRendezVous || 'OUI\nmais pas le dimanche',
      champsSurchargés?.region || 'Auvergne-Rhône-Alpes',
      champsSurchargés?.siteInternet || 'https://www.ain.gouv.fr/',
      champsSurchargés?.telephone || '04 74 14 01 40',
      champsSurchargés?.ville || 'Bourg En Bresse'
    )
  }
}
