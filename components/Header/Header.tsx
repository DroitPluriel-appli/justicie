import Link from 'next/link'
import { ReactElement } from 'react'

import { useDependencies } from '../../configuration/useDependencies'
import LogoDroitPluriel from '../../public/logo-droit-pluriel.svg'
import styles from './Header.module.css'
import { useHeader } from './useHeader'

export default function Header(): ReactElement {
  const { paths, wording } = useDependencies()
  const {
    classMenu,
    isMenuClose,
    keyDown,
    touchStart,
  } = useHeader()

  return (
    <header className={styles.header}>
      <nav
        aria-hidden={!isMenuClose}
        aria-label={wording.NAVIGATION_DESKTOP}
        className={styles.desktop}
      >
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
                <LogoDroitPluriel />
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
            <Link href={paths.RECHERCHER_UNE_CONSULTATION_JURIDIQUE}>
              {wording.RECHERCHER_UNE_CONSULTATION_JURIDIQUE}
            </Link>
          </li>
        </ul>
      </nav>
      <nav
        aria-hidden={!isMenuClose}
        aria-label={wording.NAVIGATION_MOBILE}
        className={styles.mobile}
      >
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
                <LogoDroitPluriel />
              </a>
            </Link>
          </li>
          <li>
            <h1 className={styles.title}>
              {wording.JUSTICE_PLURIELLE}
            </h1>
          </li>
          <li className={styles.menu}>
            <button
              className={styles['burger-open']}
              onKeyDown={keyDown}
              onTouchStart={touchStart}
              type="button"
            >
              {wording.MENU}
              <svg
                aria-hidden
                viewBox="0 0 24 16"
              >
                <path
                  d="M0.75 15.5H23.25V13H0.75V15.5ZM0.75 9.25H23.25V6.75H0.75V9.25ZM0.75 0.5V3H23.25V0.5H0.75Z"
                />
              </svg>
            </button>
          </li>
        </ul>
      </nav>
      <nav
        aria-hidden={isMenuClose}
        className={styles[classMenu]}
      >
        <ul>
          <li className={styles['burger-menu-title']}>
            <span>
              {wording.MENU}
            </span>
            <button
              onKeyDown={keyDown}
              onTouchStart={touchStart}
              title={wording.FERMER}
              type="button"
            >
              <svg
                aria-hidden
                height="14"
                viewBox="0 0 14 14"
                width="14"
              >
                <path
                  d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
                />
              </svg>
            </button>
          </li>
          <li>
            <a href={paths.ACCUEIL}>
              <svg
                aria-hidden
                height="21"
                viewBox="0 0 21 21"
                width="21"
              >
                <path
                  d="M8.4 21V13.5882H12.6V21H17.85V11.1176H21L10.5 0L0 11.1176H3.15V21H8.4Z"
                />
              </svg>
              {wording.ACCUEIL}
            </a>
          </li>
          <li>
            <a href={paths.RECHERCHER_UNE_CONSULTATION_JURIDIQUE}>
              <svg
                aria-hidden
                height="21"
                viewBox="0 0 21 21"
                width="21"
              >
                <path
                  d="M5.99142 13.2075H6.93997L7.27616 12.8834C6.09949 11.5146 5.39108 9.73756 5.39108 7.80446C5.39108 3.494 8.88508 0 13.1955 0C17.506 0 21 3.494 21 7.80446C21 12.1149 17.506 15.6089 13.1955 15.6089C11.2624 15.6089 9.48542 14.9005 8.11664 13.7238L7.79245 14.06V15.0086L1.78902 21L0 19.211L5.99142 13.2075ZM13.1955 13.2075C16.1852 13.2075 18.5986 10.7942 18.5986 7.80446C18.5986 4.81475 16.1852 2.40137 13.1955 2.40137C10.2058 2.40137 7.79245 4.81475 7.79245 7.80446C7.79245 10.7942 10.2058 13.2075 13.1955 13.2075Z"
                />
              </svg>
              {wording.RECHERCHER_UNE_CONSULTATION_JURIDIQUE}
            </a>
          </li>
          <li>
            <a href={paths.NOS_CRITERES_D_ACCESSIBILITE}>
              <svg
                height="18"
                viewBox="0 0 24 24"
                width="18"
              >
                <path
                  d="M 11.609375 16.941406 C 11.347656 17.203125 11.007812 17.332031 10.667969 17.332031 C 10.324219 17.332031 9.984375 17.203125 9.722656 16.941406 L 4.390625 11.609375 C 3.871094 11.089844 3.871094 10.246094 4.390625 9.722656 C 4.910156 9.203125 5.753906 9.203125 6.277344 9.722656 L 10.667969 14.113281 L 23.566406 1.214844 C 23.089844 0.484375 22.269531 0 21.332031 0 L 2.667969 0 C 1.191406 0 0 1.191406 0 2.667969 L 0 21.332031 C 0 22.804688 1.191406 24 2.667969 24 L 21.332031 24 C 22.804688 24 24 22.804688 24 21.332031 L 24 4.550781 Z M 11.609375 16.941406"
                />
              </svg>
              {wording.NOS_CRITERES_D_ACCESSIBILITE}
            </a>
          </li>
          <li>
            <a href={paths.POLITIQUE_DE_GESTION_DES_DONNEES}>
              <svg
                height="24"
                viewBox="3 0 24 24"
                width="24"
              >
                <path d="M 12 1 C 8.6761905 1 6 3.6761905 6 7 L 6 8 C 4.9 8 4 8.9 4 10 L 4 20 C 4 21.1 4.9 22 6 22 L 18 22 C 19.1 22 20 21.1 20 20 L 20 10 C 20 8.9 19.1 8 18 8 L 18 7 C 18 3.6761905 15.32381 1 12 1 z M 12 3 C 14.27619 3 16 4.7238095 16 7 L 16 8 L 8 8 L 8 7 C 8 4.7238095 9.7238095 3 12 3 z M 12 13 C 13.1 13 14 13.9 14 15 C 14 16.1 13.1 17 12 17 C 10.9 17 10 16.1 10 15 C 10 13.9 10.9 13 12 13 z" />
              </svg>
              {wording.POLITIQUE_DE_GESTION_DES_DONNEES}
            </a>
          </li>
        </ul>
      </nav>
    </header >
  )
}
