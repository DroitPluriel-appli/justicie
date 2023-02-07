import { ReactElement } from 'react'

import { useDependencies } from '../../../configuration/useDependencies'
import { BoutonModeSombre } from '../BoutonModeSombre/BoutonModeSombre'
import styles from '../Header.module.css'

type MenuBurgerPros = Readonly<{
  classMenu: 'burgerMenuClose' | 'burgerMenuOpen'
  isMenuClose: boolean
  touch: () => void
}>

export default function MenuBurger({ classMenu, isMenuClose, touch }: MenuBurgerPros): ReactElement {
  const { paths, wording } = useDependencies()

  return (
    <div
      aria-labelledby="menu-title"
      aria-modal={!isMenuClose}
      id="menu-mobile-container"
      role="dialog"
    >
      <nav
        aria-hidden={isMenuClose}
        className={styles[classMenu]}
      >
        <ul>
          <li className={styles.burgerMenuTitle}>
            <span id="menu-title">
              {wording.MENU}
            </span>
            <button
              aria-controls="menu-mobile-container"
              onClick={touch}
              title={wording.FERMER}
              type="button"
            >
              <svg
                aria-hidden
                height="14"
                viewBox="0 0 14 14"
                width="14"
              >
                <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" />
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
                <path d="M8.4 21V13.5882H12.6V21H17.85V11.1176H21L10.5 0L0 11.1176H3.15V21H8.4Z" />
              </svg>
              {wording.ACCUEIL}
            </a>
          </li>
          <li>
            <a href={paths.RECHERCHER_UNE_AIDE_JURIDIQUE}>
              <svg
                aria-hidden
                height="21"
                viewBox="0 0 21 21"
                width="21"
              >
                <path d="M5.99142 13.2075H6.93997L7.27616 12.8834C6.09949 11.5146 5.39108 9.73756 5.39108 7.80446C5.39108 3.494 8.88508 0 13.1955 0C17.506 0 21 3.494 21 7.80446C21 12.1149 17.506 15.6089 13.1955 15.6089C11.2624 15.6089 9.48542 14.9005 8.11664 13.7238L7.79245 14.06V15.0086L1.78902 21L0 19.211L5.99142 13.2075ZM13.1955 13.2075C16.1852 13.2075 18.5986 10.7942 18.5986 7.80446C18.5986 4.81475 16.1852 2.40137 13.1955 2.40137C10.2058 2.40137 7.79245 4.81475 7.79245 7.80446C7.79245 10.7942 10.2058 13.2075 13.1955 13.2075Z" />
              </svg>
              {wording.RECHERCHER_UNE_AIDE_JURIDIQUE}
            </a>
          </li>
          <li>
            <a href={paths.NOS_CRITERES_D_ACCESSIBILITE}>
              <svg
                aria-hidden
                height="21"
                viewBox="0 0 24 24"
                width="21"
              >
                <path d="M 11.609375 16.941406 C 11.347656 17.203125 11.007812 17.332031 10.667969 17.332031 C 10.324219 17.332031 9.984375 17.203125 9.722656 16.941406 L 4.390625 11.609375 C 3.871094 11.089844 3.871094 10.246094 4.390625 9.722656 C 4.910156 9.203125 5.753906 9.203125 6.277344 9.722656 L 10.667969 14.113281 L 23.566406 1.214844 C 23.089844 0.484375 22.269531 0 21.332031 0 L 2.667969 0 C 1.191406 0 0 1.191406 0 2.667969 L 0 21.332031 C 0 22.804688 1.191406 24 2.667969 24 L 21.332031 24 C 22.804688 24 24 22.804688 24 21.332031 L 24 4.550781 Z M 11.609375 16.941406" />
              </svg>
              {wording.NOS_CRITERES_D_ACCESSIBILITE}
            </a>
          </li>
          <li>
            <a href={paths.POLITIQUE_DE_CONFIDENTIALITE}>
              <svg
                aria-hidden
                height="21"
                viewBox="0 0 24 24"
                width="21"
              >
                <path d="M 11.960938,0 C 6.9590071,0 2.9316406,3.0587862 2.9316406,6.8574219 V 8 C 1.2762738,8 -0.078125,9.6158128 -0.078125,10.766966 V 21.233034 C -0.078125,22.384187 1.2762738,24 2.9316406,24 H 20.990234 C 22.645602,24 24,22.384187 24,21.233034 V 10.766966 C 24,9.6158128 22.645602,8 20.990234,8 V 6.8574219 C 20.990234,3.0587862 16.962868,0 11.960938,0 Z m 0,2.2851562 c 3.42539,0 6.019531,1.9709077 6.019531,4.5722657 V 8 H 5.9414062 V 6.8574219 c 0,-2.601358 2.5941405,-4.5722656 6.0195318,-4.5722657 z M 12,13.294922 c 1.333192,1.38e-4 2.413924,1.08087 2.414062,2.414062 C 14.413925,17.042177 13.333193,18.122909 12,18.123047 10.666807,18.122909 9.5860749,17.042177 9.5859375,15.708984 9.5860755,14.375791 10.666807,13.29506 12,13.294922 Z" />
              </svg>
              {wording.POLITIQUE_DE_CONFIDENTIALITE}
            </a>
          </li>
          <li>
            <BoutonModeSombre />
          </li>
        </ul>
      </nav>
    </div>
  )
}
