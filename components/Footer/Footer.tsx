import Link from 'next/link'
import { ReactElement } from 'react'

import { useDependencies } from '../../configuration/useDependencies'
import Logo from '../Logo/Logo'
import styles from './Footer.module.css'

export default function Footer(): ReactElement {
  const { paths, wording } = useDependencies()
  const date = new Date()

  return (
    <footer className={styles.footer}>
      <div>
        <Logo />
        <section aria-label={wording.INFORMATIONS}>
          <header>
            {wording.INFORMATIONS}
          </header>
          <ul>
            <li>
              <Link href={paths.RECHERCHER_UNE_AIDE_JURIDIQUE}>
                {wording.RECHERCHER_UNE_AIDE_JURIDIQUE}
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
            <li>
              <Link href={paths.FOIRE_AUX_QUESTIONS}>
                {wording.FOIRE_AUX_QUESTIONS}
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
          </ul>
        </section>
      </div>
      <p>
        {wording.COPYRIGHT(date.getFullYear())}
        <Link href={paths.MENTIONS_LEGALES}>
          {wording.MENTIONS_LEGALES}
        </Link>
      </p>
    </footer>
  )
}
