import { Critere } from './Critere'

export class Lieu {
  constructor(
    readonly adresse: string,
    readonly codePostal: string,
    readonly commentaire: string,
    readonly criteres: Record<Critere, boolean>,
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
  ) {
    this.distance = Number((this.distance * 100).toPrecision(2))
  }
}
