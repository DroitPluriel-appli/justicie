import Link from 'next/link'
import { ReactElement } from 'react'

import { useDependencies } from '../../configuration/useDependencies'
import LogoDroitPluriel from '../../public/logo-droit-pluriel.svg'
import styles from './Footer.module.css'

export default function Footer(): ReactElement {
  const { paths, wording } = useDependencies()

  return (
    <footer className={styles.footer}>
      <div>
        <LogoDroitPluriel />
        <section aria-label={wording.INFORMATIONS}>
          <header>
            {wording.INFORMATIONS}
          </header>
          <ul>
            <li>
              <Link href={paths.RECHERCHER_UNE_CONSULTATION_JURIDIQUE}>
                {wording.RECHERCHER_UNE_CONSULTATION_JURIDIQUE}
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
              <abbr title="Foire aux questions">
                <Link href={paths.FAQ}>
                  {wording.FAQ}
                </Link>
              </abbr>
            </li>
            <li>
              <Link href={paths.MENTIONS_LEGALES}>
                {wording.MENTIONS_LEGALES}
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
        {wording.COPYRIGHT}
      </p>
    </footer>
  )
}
