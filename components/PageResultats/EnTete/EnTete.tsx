import Link from 'next/link'
import { ReactElement } from 'react'

import styles from './EnTete.module.css'
import { useDependencies } from '../../../configuration/useDependencies'
import BackLink from '../../common/BackLink/BackLink'
import Email from '../../common/Email/Email'
import { besoinsAccessibilite, buildUrlWithQueryParams, isListe } from '../../common/query'
import Telephone from '../../common/Telephone/Telephone'

type EnTeteProps = Readonly<{
  nombreDeResultat: number
  rayonDeRecherche?: number
}>

export default function EnTete({ nombreDeResultat, rayonDeRecherche = Infinity }: EnTeteProps): ReactElement {
  const { paths, useRouter, wording } = useDependencies()
  const { pathname, query } = useRouter()

  const listeStyle = isListe(pathname, paths) ? styles.current : ''
  const planStyle = isListe(pathname, paths) ? '' : styles.current

  return (
    <>
      <BackLink
        className="blue"
        url={paths.RECHERCHER_UNE_AIDE_JURIDIQUE}
      >
        {wording.MODIFIER_L_ADRESSE}
      </BackLink>
      <nav>
        <ul className={styles.nav}>
          <li className={styles.liste + ' ' + listeStyle}>
            <Link
              href={buildUrlWithQueryParams(query, paths.RESULTATS_LISTE)}
              title={wording.AFFICHEZ_RESULTATS_EN_LISTE}
            >
              {wording.LISTE}
            </Link>
          </li>
          <li className={styles.plan + ' ' + planStyle}>
            <Link
              href={buildUrlWithQueryParams(query, paths.RESULTATS_PLAN)}
              title={wording.AFFICHEZ_RESULTATS_EN_PLAN}
            >
              {wording.PLAN}
            </Link>
          </li>
        </ul>
      </nav>
      <ul className={styles.besoins}>
        <li>
          <Link
            href={buildUrlWithQueryParams(query, paths.RECHERCHER_PAR_HANDICAP)}
            title={wording.MODIFIER_VOTRE_BESOIN_D_ACCESSIBILITE}
          >
            {wording.BESOINS_D_ACCESSIBILITE}
            <span>
              {besoinsAccessibilite(query)}
            </span>
          </Link>
        </li>
      </ul>
      {
        nombreDeResultat === 0 ? (
          <>
            <p className={styles.aucuneCorrespondance}>
              {wording.AUCUN_LIEU_NE_CORRESPOND_A_VOTRE_RECHERCHE(rayonDeRecherche)}
            </p>
            <p>
              {wording.CONTACTER_LA_PERMANENCE}
            </p>
            <address className={styles.adresse}>
              <Email
                hasPicto
                url={wording.EMAIL_DROIT_PLURIEL_ZERO_RESULTAT}
              >
                {wording.EMAIL_DROIT_PLURIEL_ZERO_RESULTAT}
              </Email>
              <br />
              <Telephone
                hasPicto
                nomDuLieu={wording.PERMANENCE_JURIDIQUE}
                url={wording.TELEPHONE_DROIT_PLURIEL_ZERO_RESULTAT}
              >
                {wording.TELEPHONE_DROIT_PLURIEL_ZERO_RESULTAT}
              </Telephone>
            </address>
            <p>
              {wording.CONTACTER_CDAD}
            </p>
          </>
        ) : (
          <p className={styles.correspondance}>
            {wording.LIEUX_CORRESPONDENT_A_VOTRE_RECHERCHE(nombreDeResultat, rayonDeRecherche)}
          </p>
        )
      }
    </>
  )
}
