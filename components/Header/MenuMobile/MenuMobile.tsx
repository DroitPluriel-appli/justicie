import Image from 'next/image'
import Link from 'next/link'
import { ReactElement } from 'react'

import { frontDependencies } from '../../../configuration/frontDependencies'
import styles from '../Header.module.css'

type MenuMobilePros = Readonly<{
  isMenuClose: boolean
  touch: () => void
}>

export default function MenuMobile({ isMenuClose, touch }: MenuMobilePros): ReactElement {
  const { paths, wording } = frontDependencies

  return (
    <nav
      aria-hidden={!isMenuClose}
      aria-label={wording.NAVIGATION_MOBILE}
      className={styles.mobile}
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
        <li className={styles.title}>
          {wording.JUSTICIE}
        </li>
        <li className={styles.menu}>
          <button
            className={styles.burgerOpen}
            onClick={touch}
            type="button"
          >
            {wording.MENU}
            <svg
              aria-hidden
              viewBox="0 0 24 16"
            >
              <path d="M0.75 15.5H23.25V13H0.75V15.5ZM0.75 9.25H23.25V6.75H0.75V9.25ZM0.75 0.5V3H23.25V0.5H0.75Z" />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  )
}
