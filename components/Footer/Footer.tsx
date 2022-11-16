import Link from 'next/link'
import { ReactElement } from 'react'

import { useDependencies } from '../../configuration/useDependencies'
import styles from './Footer.module.css'
import Logo from './logo.svg'

export default function Footer(): ReactElement {
  const { paths, wording } = useDependencies()

  return (
    <footer className={styles.footer}>
      <div>
        <Logo />
        <section aria-label={wording.JUSTICE_PLURIELLE}>
          <header>
            {wording.JUSTICE_PLURIELLE}
          </header>
          <ul>
            <li>
              <Link href={paths.RECHERCHER_UN_LIEU_DE_DROIT}>
                {wording.RECHERCHER_UN_LIEU_DE_DROIT}
              </Link>
            </li>
            <li>
              <Link href={paths.NOS_CRITERES_D_ACCESSIBILITE}>
                {wording.NOS_CRITERES_D_ACCESSIBILITE}
              </Link>
            </li>
            <li>
              <Link href={paths.POLITIQUE_DE_GESTION_DES_DONNEES}>
                {wording.POLITIQUE_DE_GESTION_DES_DONNEES}
              </Link>
            </li>
          </ul>
        </section>
        <section aria-label={wording.INFORMATION}>
          <header>
            {wording.INFORMATION}
          </header>
          <ul>
            <li>
              <Link href={paths.AIDE_SUR_LE_SITE}>
                {wording.AIDE_SUR_LE_SITE}
              </Link>
            </li>
            <li>
              <Link href={paths.CONFIDENTIALITE_INFORMATIONS_PERSONNELLES}>
                {wording.CONFIDENTIALITE_INFORMATIONS_PERSONNELLES}
              </Link>
            </li>
            <li>
              <Link href={paths.SECURITE_INFORMATIQUE}>
                {wording.SECURITE_INFORMATIQUE}
              </Link>
            </li>
          </ul>
        </section>
        <section aria-label={wording.QUALITE_DE_SERVICE}>
          <header>
            {wording.QUALITE_DE_SERVICE}
          </header>
          <ul>
            <li>
              {wording.ACCESSIBILITE}
            </li>
            <li>
              {wording.SOURDS_ET_MALENTENDANTS}
            </li>
          </ul>
        </section>
      </div>
      <p>
        {wording.COPYRIGHT}
        <Link href={paths.MENTIONS_LEGALES}>
          {wording.MENTIONS_LEGALES}
        </Link>
      </p>
    </footer>
  )
}
