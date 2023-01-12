import Link from 'next/link'
import { ReactElement } from 'react'

import { useDependencies } from '../../configuration/useDependencies'
import { useQueryUtilities } from '../../configuration/useQueryUtilities'
import BackButton from '../BackButton/BackButton'
import Title from '../Title/Title'
import CritereDAccessibilite from './CritereDAccessibilite'
import styles from './RechercherParHandicap.module.css'

export default function RechercherParHandicap(): ReactElement {
  const { criteres, paths, useRouter, wording } = useDependencies()
  const { query } = useRouter()
  const { latLongQueryIsInvalid } = useQueryUtilities()

  if (latLongQueryIsInvalid(query)) {
    return (
      <p>
        {wording.RECOMMENCER_PARCOURS}
      </p>
    )
  }

  return (
    <div className={styles.main}>
      <Title>
        {wording.TITLE_PAGE_RECHERCHER_PAR_HANDICAP}
      </Title>
      <div className={styles.links}>
        <BackButton>
          {wording.MODIFIER_L_ADRESSE}
        </BackButton>
        <Link href={`${paths.RESULTATS_LISTE}?lat=${query.lat as string}&lon=${query.lon as string}`}>
          {wording.PASSER}
        </Link>
      </div>
      <h2 className={styles.title}>
        {wording.BESOIN_EN_ACCESSIBILITE}
        <div>
          {wording.FACULTATIF}
        </div>
      </h2>
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
  )
}
