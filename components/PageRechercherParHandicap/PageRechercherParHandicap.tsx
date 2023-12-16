'use client'

import Link from 'next/link'
import { ReactElement } from 'react'

import CritereDAccessibilite from './CritereDAccessibilite/CritereDAccessibilite'
import styles from './PageRechercherParHandicap.module.css'
import { frontDependencies } from '../../configuration/frontDependencies'
import { useDependencies } from '../../configuration/useDependencies'
import BackButton from '../common/BackButton/BackButton'

export default function PageRechercherParHandicap(): ReactElement {
  const { useSearchParams } = useDependencies()
  const { criteres, paths, wording } = frontDependencies
  const searchParams = useSearchParams()

  return (
    <div className={styles.main}>
      <div className={styles.links}>
        <BackButton>
          {wording.MODIFIER_L_ADRESSE}
        </BackButton>
        <Link href={{
          pathname: paths.RESULTATS_LISTE,
          query: {
            lat: searchParams.get('lat'),
            lon: searchParams.get('lon'),
          },
        }}
        >
          {wording.PASSER}
        </Link>
      </div>
      <h1 className="titre1">
        {wording.BESOIN_EN_ACCESSIBILITE}
        <span>
          {wording.FACULTATIF}
        </span>
      </h1>
      <form action={paths.RESULTATS_LISTE}>
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
          value={String(searchParams.get('lat'))}
        />
        <input
          name="lon"
          type="hidden"
          value={String(searchParams.get('lon'))}
        />
        <div className={styles.submit}>
          <button type="submit">
            {wording.AFFICHER_LES_RESULTATS}
          </button>
        </div>
      </form>
    </div>
  )
}
