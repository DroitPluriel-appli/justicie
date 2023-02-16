import Image from 'next/image'
import Link from 'next/link'
import { ReactElement } from 'react'

import { useDependencies } from '../../../configuration/useDependencies'
import styles from '../Header.module.css'

type MenuDesktopPros = Readonly<{
  isMenuClose: boolean
}>

export default function MenuDesktop({ isMenuClose }: MenuDesktopPros): ReactElement {
  const { paths, wording } = useDependencies()

  return (
    <nav
      aria-hidden={!isMenuClose}
      aria-label={wording.NAVIGATION_DESKTOP}
      className={styles.desktop}
    >
      <ul>
        <li>
          <Link href={paths.ACCUEIL}>
            <Image
              alt={wording.ACCUEIL}
              height="64"
              src="/logo-justicie.png"
              width="64"
            />
          </Link>
        </li>
        <li>
          <h1 className={styles.title}>
            {wording.JUSTICIE}
          </h1>
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
          <Link href={paths.FOIRE_AUX_QUESTIONS}>
            {wording.FOIRE_AUX_QUESTIONS}
          </Link>
        </li>
        <li className={styles.rechercher}>
          <Link href={paths.RECHERCHER_UNE_AIDE_JURIDIQUE}>
            {wording.RECHERCHER_UNE_AIDE_JURIDIQUE}
          </Link>
        </li>
      </ul>
    </nav>
  )
}
