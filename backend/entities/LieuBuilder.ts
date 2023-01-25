import { Lieu } from './Lieu'

export class LieuBuilder {
  public static cree(champsSurcharges?: Partial<Lieu>): Lieu {
    return new Lieu(
      champsSurcharges?.adresse || '34 cours de Verdun',
      champsSurcharges?.codePostal || '1000',
      champsSurcharges?.commentaire || 'En partie\nformé',
      champsSurcharges?.criteres || {
        bim: false,
        calme: false,
        forme: false,
        lsf: false,
        pmr: true,
        pmr_assiste: true,
        visuel: true,
      },
      champsSurcharges?.departement || 'Ain',
      champsSurcharges?.distance || 0.26000000000000245,
      champsSurcharges?.domaineDeDroit || 'TOUT DOMAINES',
      champsSurcharges?.eMail || 'mjd.bourg-en-bresse@example.com',
      champsSurcharges?.horaire || 'Lundi 9h00 à 12h00 et de 13h30 à 17h00\nMardi 9h00 à 12h00 et de 13h30 à 17h00\nMercredi 9h00 à 12h00 et de 13h30 à 17h00\nJeudi 9h00 à 12h00 et de 13h30 à 17h00\nVendredi 9h00 à 12h00 et de 13h30 à 17h00',
      champsSurcharges?.id || 1,
      champsSurcharges?.latitude || 46.2064358,
      champsSurcharges?.longitude || 5.2272134,
      champsSurcharges?.nom || 'Maison de Justice et du Droit de Bourg en Bresse',
      champsSurcharges?.priseDeRendezVous || 'OUI\nmais pas le dimanche',
      champsSurcharges?.region || 'Auvergne-Rhône-Alpes',
      champsSurcharges?.siteInternet || 'https://www.ain.gouv.fr/',
      champsSurcharges?.telephone || '04 74 14 01 40',
      champsSurcharges?.ville || 'Bourg En Bresse'
    )
  }
}
