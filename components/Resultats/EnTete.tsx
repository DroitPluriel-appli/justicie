import Link from 'next/link'
import { ReactElement } from 'react'

import { useDependencies } from '../../configuration/useDependencies'
import BackLink from '../BackLink/BackLink'
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
      <BackLink
        className="blue"
        url={paths.RECHERCHER_UNE_CONSULTATION_JURIDIQUE}
      >
        {wording.MODIFIER_L_ADRESSE}
      </BackLink>
      <nav>
        <ul className={styles.nav}>
          <li className={styles.liste + ' ' + listeStyle}>
            <Link href={buildUrlWithQueryParams(paths.RESULTATS_LISTE)}>
              {wording.LISTE}
            </Link>
          </li>
          <li className={styles.plan + ' ' + planStyle}>
            <Link href={buildUrlWithQueryParams(paths.RESULTATS_PLAN)}>
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
