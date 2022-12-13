import Head from 'next/head'
import Link from 'next/link'
import { ReactElement } from 'react'

import { useDependencies } from '../../configuration/useDependencies'
import styles from './RechercherUneConsultationJuridique.module.css'
import { useRechercherUneConsultationJuridique } from './useRechercherUneConsultationJuridique'

export default function RechercherUneConsultationJuridique(): ReactElement {
  const { paths, wording } = useDependencies()
  const { buttonName, isDisabled, keyDown, touch } = useRechercherUneConsultationJuridique()

  return (
    <div className={styles.main}>
      <Head>
        <title>
          {wording.TITLE_PAGE_RECHERCHER_UNE_CONSULTATION_JURIDIQUE}
        </title>
      </Head>
      <Link
        href={paths.ACCUEIL}
        legacyBehavior
      >
        <a href={paths.ACCUEIL}>
          <svg
            aria-hidden
            height="10"
            viewBox="0 0 6 10"
            width="6"
          >
            <path
              d="M5.58782 9.41218C5.91221 9.08779 5.9125 8.56193 5.58846 8.23718L3.06313 5.70634C2.67363 5.31599 2.67363 4.68401 3.06313 4.29366L5.58846 1.76282C5.9125 1.43807 5.91221 0.912214 5.58782 0.58782C5.26318 0.263176 4.73682 0.263176 4.41218 0.58782L0.707107 4.29289C0.316583 4.68342 0.316583 5.31658 0.707107 5.70711L4.41218 9.41218C4.73682 9.73682 5.26318 9.73682 5.58782 9.41218Z"
              fill="white"
            />
          </svg>
          {wording.RETOUR_A_L_ACCUEIL}
        </a>
      </Link>
      <h2 className={styles.title}>
        {wording.OU_RECHERCHEZ_VOUS}
        <div>
          {wording.OBLIGATOIRE}
        </div>
      </h2>
      <button
        className={`${styles.button} ${styles.positionActuelle}`}
        disabled={isDisabled}
        onClick={touch}
        onKeyDown={keyDown}
        onTouchStart={touch}
        type="button"
      >
        {buttonName}
      </button>
      <div className={styles.ou}>
        {wording.OU}
      </div>
      <Link
        className={`${styles.button} ${styles.renseignerAdresse}`}
        href={paths.RENSEIGNER_UNE_ADRESSE}
      >
        {wording.RENSEIGNER_UNE_ADRESSE}
      </Link>
    </div>
  )
}
