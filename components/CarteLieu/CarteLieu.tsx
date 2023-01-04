import Image from 'next/image'
import Link from 'next/link'
import { ReactElement } from 'react'

import { Lieu } from '../../backend/entities/Lieu'
import { useDependencies } from '../../configuration/useDependencies'
import ExternalLink from '../ExternalLink/ExternalLink'
import styles from './CarteLieu.module.css'
import { useCarteLieu } from './useCarteLieu'

type CarteLieuProps = Readonly<{
  lieu: Lieu
  origin: { lat: number, lon: number }
}>

export default function CarteLieu({ lieu, origin }: CarteLieuProps): ReactElement {
  const {
    nom,
    telephone,
    adresse,
    codePostal,
    ville,
    distance,
  } = lieu

  const { wording } = useDependencies()
  const { getCriteresImgSrcFromLieu, nomToGoogleMapLink: lieuToGoogleMapLink } = useCarteLieu()

  return (
    <article className={styles.carteLieu}>
      <h1>
        {nom}
      </h1>
      <address>
        <a href={`tel:${telephone}`}>
          <svg
            className={styles.carteLieu__icon}
            height="14"
            viewBox="0 0 48 48"
            width="14"
          >
            <path
              d="M 9.6666663,20.786667 C 13.506667,28.333334 19.679999,34.506666 27.24,38.346667 l 5.866667,-5.880001 c 0.733333,-0.733332 1.786666,-0.946667 2.706667,-0.653333 2.986667,0.986667 6.2,1.52 9.519999,1.52 C 46.813333,33.333333 48,34.52 48,36 v 9.333333 C 48,46.813333 46.813333,48 45.333333,48 20.293333,48 0,27.706667 0,2.6666671 0,1.1866666 1.1999998,0 2.6666671,0 H 12 c 1.48,0 2.666667,1.1866666 2.666667,2.6666671 0,3.3199988 0.533333,6.5333321 1.52,9.5199989 0.293334,0.920001 0.08001,1.973334 -0.653333,2.706667 z"
              fill="#000"
            />
          </svg>
          {telephone}
        </a>
        <p className={styles.carteLieu__adress__paragraph}>
          {adresse}
          <br />
          {codePostal + ' '}
          {ville}
        </p>
      </address>
      <p className={styles.carteLieu__distance}>
        <svg
          className={styles.carteLieu__icon}
          fill="#000000"
          height="14"
          viewBox="-2 -2 24 24"
          width="14"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M18.919 2.635l-5.953 16.08c-.376 1.016-1.459 1.538-2.418 1.165a1.851 1.851 0 0 1-1.045-1.054l-1.887-4.77a3.712 3.712 0 0 0-1.955-2.052l-4.542-1.981C.174 9.61-.256 8.465.157 7.465a1.97 1.97 0 0 1 1.067-1.079L16.54.136c.967-.395 2.04.101 2.395 1.109.157.446.151.94-.015 1.39z" />
        </svg>
        {Number(distance).toPrecision(2) + ' km'}
      </p>
      <div className={styles.carteLieu__criteres}>
        {
          getCriteresImgSrcFromLieu(lieu).map(
            (critere) => (
              <Image
                alt={critere.title}
                height="30"
                key={critere.title}
                src={critere.imgSrc}
                title={critere.title}
                width="30"
              />
            )
          )
        }
      </div>
      <ExternalLink
        className={styles.carteLieu__buttons}
        href={lieuToGoogleMapLink(lieu, origin)}
        title={wording.LANCER_L_ITINERAIRE}
      >
        {wording.LANCER_L_ITINERAIRE}
      </ExternalLink>
      <Link
        className={styles.carteLieu__buttons}
        href="#"
        title={wording.PLUS_D_INFORMATIONS}
      >
        {wording.PLUS_D_INFORMATIONS}
      </Link>
    </article>
  )
}
