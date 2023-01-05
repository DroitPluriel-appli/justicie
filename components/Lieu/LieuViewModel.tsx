import Image from 'next/image'
import Link from 'next/link'
import { ReactElement } from 'react'

import { Lieu } from '../../backend/entities/Lieu'
import { Critere } from '../../configuration/criteres'
import { Paths } from '../../configuration/Paths'
import { Wording } from '../../configuration/wording/Wording'
import ExternalLink from '../ExternalLink/ExternalLink'

export class LieuViewModel {
  constructor(
    private readonly criteres: Critere[],
    private readonly lieu: Lieu,
    private readonly paths: Paths,
    private readonly wording: Wording
  ) {}

  get title(): string {
    return this.wording.TITLE_PAGE_LIEU(this.lieu.nom)
  }

  get nom(): string {
    return this.lieu.nom
  }

  get distance(): ReactElement {
    return (
      <p className="distance">
        <svg
          aria-hidden
          height="14"
          viewBox="-2 -2 24 24"
          width="14"
        >
          <path
            d="M18.919 2.635l-5.953 16.08c-.376 1.016-1.459 1.538-2.418 1.165a1.851 1.851 0 0 1-1.045-1.054l-1.887-4.77a3.712 3.712 0 0 0-1.955-2.052l-4.542-1.981C.174 9.61-.256 8.465.157 7.465a1.97 1.97 0 0 1 1.067-1.079L16.54.136c.967-.395 2.04.101 2.395 1.109.157.446.151.94-.015 1.39z"
            fill="#000"
          />
        </svg>
        {this.lieu.distance.toPrecision(2)}
        {' '}
        <abbr title={this.wording.KILOMETRES}>
          {'km'}
        </abbr>
      </p>
    )
  }

  get adresse(): ReactElement {
    return (
      <p>
        {this.lieu.adresse}
        <br />
        {this.lieu.codePostal + ' '}
        {this.lieu.ville}
      </p>
    )
  }

  itineraire(latitude: number, longitude: number, hasPicto = false): ReactElement {
    return (
      <ExternalLink
        className="carteLieu__buttons"
        href={this.lieuToGoogleMapLink(latitude, longitude)}
        title={this.wording.LANCER_L_ITINERAIRE}
      >
        {
          hasPicto ? (
            <svg
              aria-hidden
              height="12"
              viewBox="0 0 17 12"
              width="17"
            >
              <path
                d="M1.99361 11L1.99361 7L13.3546 7L10.2664 10.59L11.4827 12L16.6586 6L11.4827 5.11959e-07L10.2664 1.41L13.3546 5L0.268325 5L0.268324 11L1.99361 11Z"
                fill="#fff"
              />
            </svg>
          ) : null
        }
        {this.wording.LANCER_L_ITINERAIRE}
      </ExternalLink>
    )
  }

  plusDInformations(latitude: number, longitude: number): ReactElement {
    return (
      <Link
        className="carteLieu__buttons"
        href={`${this.paths.LIEU}/${this.lieu.id}?lat=${latitude}&lon=${longitude}`}
        title={this.wording.PLUS_D_INFORMATIONS}
      >
        {this.wording.PLUS_D_INFORMATIONS}
      </Link>
    )
  }

  get accessibilites(): ReactElement[] {
    return this.criteres
      .filter((critere): string => this.lieu[critere.name] as string)
      .map((critere) => (
        <Image
          alt={critere.title}
          height="40"
          key={critere.title}
          src={critere.imgSrc}
          title={critere.title}
          width="40"
        />
      ))
  }

  get priseDeRendezVous() {
    return (
      <pre>
        {this.lieu.priseDeRendezVous}
      </pre>
    )
  }

  get horaire() {
    return (
      <pre>
        {this.lieu.horaire}
      </pre>
    )
  }

  get commentaire() {
    return (
      <pre>
        {this.lieu.commentaire}
      </pre>
    )
  }

  get eMail(): ReactElement {
    return (
      <a href={`mailto:${this.lieu.eMail}`}>
        <svg
          aria-hidden
          height="14"
          viewBox="0 0 32 32"
          width="14"
        >
          <path
            d="M29,6H3L2.92,6a.78.78,0,0,0-.21,0l-.17.07a.65.65,0,0,0-.15.1.67.67,0,0,0-.15.14l-.06.06a.36.36,0,0,0,0,.09,1.08,1.08,0,0,0-.08.19A1.29,1.29,0,0,0,2,6.9S2,7,2,7V25a1,1,0,0,0,1,1H29a1,1,0,0,0,1-1V7A1,1,0,0,0,29,6ZM16,14.81,6.2,8H27.09ZM4,24V8.91l11.43,7.91,0,0a1.51,1.51,0,0,0,.18.09l.08,0A1.09,1.09,0,0,0,16,17h0a1,1,0,0,0,.41-.1l.07,0,0,0L28,9.79V24Z"
          />
        </svg>
        {this.lieu.eMail}
      </a>
    )
  }

  get telephone(): ReactElement {
    return (
      <a href={`tel:${this.lieu.telephone.replaceAll(' ', '')}`}>
        <svg
          aria-hidden
          height="14"
          viewBox="0 0 48 48"
          width="14"
        >
          <path
            d="M 9.6666663,20.786667 C 13.506667,28.333334 19.679999,34.506666 27.24,38.346667 l 5.866667,-5.880001 c 0.733333,-0.733332 1.786666,-0.946667 2.706667,-0.653333 2.986667,0.986667 6.2,1.52 9.519999,1.52 C 46.813333,33.333333 48,34.52 48,36 v 9.333333 C 48,46.813333 46.813333,48 45.333333,48 20.293333,48 0,27.706667 0,2.6666671 0,1.1866666 1.1999998,0 2.6666671,0 H 12 c 1.48,0 2.666667,1.1866666 2.666667,2.6666671 0,3.3199988 0.533333,6.5333321 1.52,9.5199989 0.293334,0.920001 0.08001,1.973334 -0.653333,2.706667 z"
          />
        </svg>
        {this.lieu.telephone}
      </a>
    )
  }

  get siteInternet(): ReactElement {
    return (
      <ExternalLink
        href={this.lieu.siteInternet}
        title={this.wording.CONSULTER_LE_SITE_INTERNET}
      >
        <svg
          aria-hidden
          height="14"
          viewBox="0 0 128 128"
          width="14"
        >
          <path
            d="M64,126c34.2,0,62-27.8,62-62S98.2,2,64,2S2,29.8,2,64S29.8,126,64,126z M16,88.7l25.2-0.2c2.8,10.1,7.5,19.9,13.9,28.7 C38,114.4,23.7,103.5,16,88.7z M47.6,47H79c2.3,11,2.3,22.3,0.2,33.3l-31.6,0.2C45.3,69.4,45.3,58,47.6,47z M63.3,114.9 c-6.3-8.1-10.9-17-13.7-26.4l27.5-0.2C74.2,97.7,69.6,106.7,63.3,114.9z M71.3,117.5c6.6-9,11.3-18.9,14.1-29.3l26.9-0.2 C104.5,103.7,89.3,115,71.3,117.5z M118,64c0,5.6-0.9,11-2.4,16l-28.3,0.2c2-11,1.9-22.2-0.2-33.2h28.1C117,52.3,118,58.1,118,64z M111.8,39H85.2c-2.9-10-7.5-19.7-13.9-28.5C89,12.9,103.9,23.8,111.8,39z M76.9,39H49.7c2.9-9.2,7.4-17.9,13.6-25.9 C69.5,21.1,74,29.8,76.9,39z M55.1,10.8C48.8,19.5,44.2,29,41.4,39H16.2C23.9,24.3,38.1,13.6,55.1,10.8z M39.5,47 c-2.1,11.1-2.1,22.4-0.1,33.5l-26.7,0.2C10.9,75.4,10,69.8,10,64c0-5.9,1-11.7,2.8-17H39.5z"
          />
        </svg>
        {this.wording.CONSULTER_LE_SITE_INTERNET}
      </ExternalLink>
    )
  }

  private lieuToGoogleMapLink = (latitude: number, longitude: number): string => {
    const url = new URL('https://www.google.com/maps/dir/')
    url.searchParams.append('api', '1')
    url.searchParams.append('origin', `${latitude},${longitude}`)
    const lieuQueryString = `${this.lieu.nom}+${this.lieu.adresse}+${this.lieu.codePostal}+${this.lieu.ville}`.replaceAll(' ', '+')
    url.searchParams.append('destination', lieuQueryString)

    return url.toString()
  }
}
