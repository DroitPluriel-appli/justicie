import Link from 'next/link'
import { ReactElement } from 'react'

import styles from './PageRechercherUneAideJuridique.module.css'
import { usePageRechercherUneAideJuridique } from './usePageRechercherUneAideJuridique'
import { useDependencies } from '../../configuration/useDependencies'
import BackLink from '../common/BackLink/BackLink'
import Title from '../common/Title/Title'

export default function PageRechercherUneAideJuridique(): ReactElement {
  const { paths, wording } = useDependencies()
  const { buttonName, isDisabled, isGPSDenied, touch } = usePageRechercherUneAideJuridique()

  return (
    <div className={styles.main}>
      <Title>
        {wording.TITLE_PAGE_RECHERCHER_UNE_AIDE_JURIDIQUE}
      </Title>
      <BackLink
        className="white"
        url={paths.ACCUEIL}
      >
        {wording.RETOUR_A_L_ACCUEIL}
      </BackLink>
      <h1 className="titre1">
        {wording.OU_RECHERCHEZ_VOUS}
        <span>
          {wording.OBLIGATOIRE}
        </span>
      </h1>
      {
        isGPSDenied ? (
          <p>
            {wording.GEOLOCALISATION_DESACTIVEE}
          </p>
        ) : null
      }
      <button
        className={`${styles.button} ${styles.positionActuelle}`}
        disabled={isDisabled}
        onClick={touch}
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
