import Link from 'next/link'
import { ReactElement } from 'react'

import { useDependencies } from '../../configuration/useDependencies'
import styles from './EnTete.module.css'
import { useEnTete } from './useEnTete'

type EnTeteProps = Readonly<{
  nombreDeLieuxTrouves: number
}>

export default function EnTete({ nombreDeLieuxTrouves }: EnTeteProps): ReactElement {
  const { paths, wording } = useDependencies()
  const {
    besoinsAccessibilite,
    buildUrlWithQueryParams,
    isListe,
  } = useEnTete()
  const listeStyle = isListe ? styles.current : ''
  const planStyle = isListe ? '' : styles.current

  return (
    <>
      <Link
        className={styles.back}
        href={paths.RECHERCHER_UNE_CONSULTATION_JURIDIQUE}
      >
        <svg
          aria-hidden
          height="10"
          viewBox="0 0 6 10"
          width="6"
        >
          <path
            d="M5.58782 9.41218C5.91221 9.08779 5.9125 8.56193 5.58846 8.23718L3.06313 5.70634C2.67363 5.31599 2.67363 4.68401 3.06313 4.29366L5.58846 1.76282C5.9125 1.43807 5.91221 0.912214 5.58782 0.58782C5.26318 0.263176 4.73682 0.263176 4.41218 0.58782L0.707107 4.29289C0.316583 4.68342 0.316583 5.31658 0.707107 5.70711L4.41218 9.41218C4.73682 9.73682 5.26318 9.73682 5.58782 9.41218Z"
            fill="black"
          />
        </svg>
        {wording.MODIFIER_L_ADRESSE}
      </Link>
      <nav>
        <ul className={styles.nav}>
          <li className={styles.liste + ' ' + listeStyle}>
            <Link href={buildUrlWithQueryParams(paths.RESULTATS_LISTE)}>
              {wording.LISTE}
            </Link>
          </li>
          <li className={styles.plan + ' ' + planStyle}>
            <Link href={buildUrlWithQueryParams(paths.RESULTATS_LISTE)}>
              {wording.PLAN}
            </Link>
          </li>
        </ul>
      </nav>
      <ul className={styles.besoins}>
        <li>
          <Link href={buildUrlWithQueryParams(paths.RECHERCHER_PAR_HANDICAP)}>
            {wording.BESOINS_D_ACCESSIBILITE(besoinsAccessibilite)}
          </Link>
        </li>
      </ul>
      <p className={styles.correspondance}>
        {wording.LIEUX_CORRESPONDENT_A_VOTRE_RECHERCHE(nombreDeLieuxTrouves)}
      </p>
    </>
  )
}
