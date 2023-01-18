import { Criteres } from './Criteres'

export class Lieu {
  constructor(
    readonly adresse: string,
    readonly codePostal: string,
    readonly commentaire: string,
    readonly criteres: Criteres,
    readonly departement: string,
    readonly distance: number,
    readonly domaineDeDroit: string,
    readonly eMail: string,
    readonly horaire: string,
    readonly id: number,
    readonly latitude: number,
    readonly longitude: number,
    readonly nom: string,
    readonly priseDeRendezVous: string,
    readonly region: string,
    readonly siteInternet: string,
    readonly telephone: string,
    readonly ville: string
  ) {}
}
