export class Lieu {
  constructor(
    readonly adresse: string,
    readonly bim: boolean,
    readonly calme: boolean,
    readonly codePostal: string,
    readonly commentaire: string,
    readonly departement: string,
    readonly distance: number,
    readonly domaineDeDroit: string,
    readonly e_mail: string,
    readonly forme: boolean,
    readonly horaire: string,
    readonly id: number,
    readonly latitude: number,
    readonly longitude: number,
    readonly lsf: boolean,
    readonly nom: string,
    readonly pmr: boolean,
    readonly pmr_assiste: boolean,
    readonly priseDeRendezVous: string,
    readonly region: string,
    readonly siteInternet: string,
    readonly telephone: string,
    readonly ville: string,
    readonly visuel: boolean
  ) {}
}
