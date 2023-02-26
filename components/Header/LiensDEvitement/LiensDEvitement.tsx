import { ReactElement } from 'react'

import styles from './LiensDEvitement.module.css'
import { useDependencies } from '../../../configuration/useDependencies'

export default function LiensDEvitement(): ReactElement {
  const { wording } = useDependencies()

  return (
    <nav
      aria-label={wording.ACCES_RAPIDE}
      id="evitement"
    >
      <ul className={styles.evitement}>
        <li>
          <a href="#contenu">
            {wording.EVITEMENT_ALLER_AU_CONTENU}
          </a>
        </li>
        <li>
          <a href="#menu">
            {wording.EVITEMENT_ALLER_AU_MENU}
          </a>
        </li>
        <li>
          <a href="#footer">
            {wording.EVITEMENT_ALLER_AU_PIED_DE_PAGE}
          </a>
        </li>
      </ul>
    </nav>
  )
}
