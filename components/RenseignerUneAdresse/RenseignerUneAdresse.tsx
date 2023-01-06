import Autocomplete from 'accessible-autocomplete/react'
import Head from 'next/head'
import { ReactElement } from 'react'

import { useDependencies } from '../../configuration/useDependencies'
import BackLink from '../BackLink/BackLink'
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
      <BackLink
        className="white"
        url={paths.ACCUEIL}
      >
        {wording.RETOUR_A_L_ACCUEIL}
      </BackLink>
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
