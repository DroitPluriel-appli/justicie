import Autocomplete from 'accessible-autocomplete/react'
import Head from 'next/head'
import Link from 'next/link'
import { ReactElement } from 'react'

import { useDependencies } from '../../configuration/useDependencies'
import styles from './RenseignerUneAdresse.module.css'
import { useRenseignerUneAdresse } from './useRenseignerUneAdresse'

export default function RenseignerUneAdresse(): ReactElement {
  const { paths, wording } = useDependencies()
  const {
    effaceLAdresseAuKeyDown,
    effaceLAdresseAuTouch,
    isDisabled,
    noticeDesResultats,
    selectionneUneAdresse,
    suggestionDAdresse,
    vaAlEtape2,
  } = useRenseignerUneAdresse()

  return (
    <div className={styles.main}>
      <Head>
        <title>
          {wording.TITLE_PAGE_RENSEIGNER_UNE_ADRESSE}
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
      <form
        action={paths.RECHERCHER_PAR_HANDICAP}
        onSubmit={vaAlEtape2}
        role="search"
      >
        <label
          className={styles.label}
          htmlFor="autocomplete"
        >
          {wording.RENSEIGNER_UNE_ADRESSE}
        </label>
        <div className={styles.wrapper}>
          <Autocomplete
            className={styles.autocomplete}
            id="autocomplete"
            minLength="4"
            onConfirm={selectionneUneAdresse}
            placeholder={wording.RENSEIGNER_UNE_ADRESSE}
            showNoOptionsFound={false}
            source={suggestionDAdresse}
            tAssistiveHint={noticeDesResultats}
          />
          <button
            className={styles.reset}
            onClick={effaceLAdresseAuTouch}
            onKeyDown={effaceLAdresseAuKeyDown}
            onTouchStart={effaceLAdresseAuTouch}
            title={wording.EFFACER_L_ADRESSE}
            type="button"
          >
            <svg
              aria-hidden
              height="15"
              viewBox="0 0 11 11"
              width="15"
            >
              <path
                d="M11 1.10786L9.89214 0L5.5 4.39214L1.10786 0L0 1.10786L4.39214 5.5L0 9.89214L1.10786 11L5.5 6.60786L9.89214 11L11 9.89214L6.60786 5.5L11 1.10786Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
        <div className={styles.submit}>
          <button
            disabled={isDisabled}
            type="submit"
          >
            {wording.VALIDER_L_ADRESSE}
          </button>
        </div>
      </form>
    </div>
  )
}
