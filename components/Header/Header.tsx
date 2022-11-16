import Link from 'next/link'
import { ReactElement } from 'react'

import { useDependencies } from '../../configuration/useDependencies'
import styles from './Header.module.css'
import LogoDesktop from './logo-desktop.svg'
import LogoMobile from './logo-mobile.svg'
import Menu from './menu.svg'

export default function Header(): ReactElement {
  const { paths, wording } = useDependencies()

  return (
    <header className={styles.header}>
      <nav className={styles.desktop}>
        <ul>
          <li>
            <Link
              href={paths.ACCUEIL}
              legacyBehavior
            >
              <a
                href={paths.ACCUEIL}
                title={wording.ACCUEIL}
              >
                <LogoDesktop />
              </a>
            </Link>
          </li>
          <li>
            <h1 className={styles.title}>
              {wording.JUSTICE_PLURIELLE}
            </h1>
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
          <li className={styles.rechercher}>
            <Link href={paths.RECHERCHER_UN_LIEU_DE_DROIT}>
              {wording.RECHERCHER_UN_LIEU_DE_DROIT}
            </Link>
          </li>
        </ul>
      </nav>
      <nav className={styles.mobile}>
        <ul>
          <li>
            <Link
              href={paths.ACCUEIL}
              legacyBehavior
            >
              <a
                href={paths.ACCUEIL}
                title={wording.ACCUEIL}
              >
                <LogoMobile />
              </a>
            </Link>
          </li>
          <li>
            <h1 className={styles.title}>
              {wording.JUSTICE_PLURIELLE}
            </h1>
          </li>
          <li className={styles.menu}>
            {wording.MENU}
            <Menu />
          </li>
        </ul>
      </nav>
    </header>
  )
}
