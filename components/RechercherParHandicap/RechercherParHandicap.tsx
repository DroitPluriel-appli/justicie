import Head from 'next/head'
import Link from 'next/link'
import { ReactElement } from 'react'

import { useDependencies } from '../../configuration/useDependencies'
import CritereDAccessibilite from './CritereDAccessibilite'
import styles from './RechercherParHandicap.module.css'
import { useRechercherParHandicap } from './useRechercherParHandicap'

export default function RechercherParHandicap(): ReactElement {
  const { criteres, paths, useRouter, wording } = useDependencies()
  const { query } = useRouter()
  const { retourEnArriere } = useRechercherParHandicap()

  if (query.lat === undefined || query.lon === undefined) {
    return (
      <p>
        {wording.RECOMMENCER_PARCOURS}
      </p>
    )
  }

  return (
    <>
      <Head>
        <title>
          {wording.TITLE_PAGE_RECHERCHER_PAR_HANDICAP}
        </title>
      </Head>
      <div className={styles.main}>
        <div className={styles.links}>

          <button
            onClick={retourEnArriere}
            type="button"
          >
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
            {wording.MODIFIER_L_ADRESSE}
          </button>

          <Link href={`${paths.ADRESSES_LISTE}?lat=${query.lat as string}&lon=${query.lon as string}`}>
            {wording.PASSER}
          </Link>
        </div>
        <h2 className={styles.title}>
          {wording.BESOIN_EN_ACCESSIBILITE}
          <div>
            {wording.FACULTATIF}
          </div>
        </h2>
        <form action={paths.ADRESSES_LISTE}>
          {
            criteres.map((critere) => (
              <CritereDAccessibilite
                description={critere.description}
                id={critere.name}
                imgSrc={critere.imgSrc}
                key={critere.title}
                name={critere.name}
                title={critere.title}
              />
            ))
          }
          <input
            name="lat"
            type="hidden"
            value={query.lat}
          />
          <input
            name="lon"
            type="hidden"
            value={query.lon}
          />
          <div className={styles.submit}>
            <button type="submit">
              {wording.SUIVANT}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
