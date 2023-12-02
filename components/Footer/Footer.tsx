import Image from 'next/image'
import Link from 'next/link'
import { ReactElement } from 'react'

import styles from './Footer.module.css'
import { ouvrirGestionDesCookies } from './ouvrirGestionDesCookies'
import { useDependencies } from '../../configuration/useDependencies'

export default function Footer(): ReactElement {
  const { date, paths, wording } = useDependencies()

  return (
    <footer
      className={styles.footer}
      id="footer"
    >
      <div>
        <Image
          alt=""
          height="64"
          src="/logo-justicie.png"
          width="64"
        />
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
              <Link href={paths.NOS_PARTENAIRES}>
                {wording.NOS_PARTENAIRES}
              </Link>
            </li>
            <li>
              <Link href={paths.POLITIQUE_DE_CONFIDENTIALITE}>
                {wording.POLITIQUE_DE_CONFIDENTIALITE}
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
            {process.env.NODE_ENV === 'production' && (
              <li>
                <button
                  className={styles.cookies}
                  onClick={ouvrirGestionDesCookies}
                  type="button"
                >
                  {wording.GERER_LES_COOKIES}
                </button>
              </li>
            )}
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
