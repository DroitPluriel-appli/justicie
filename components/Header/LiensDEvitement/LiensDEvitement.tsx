import { ReactElement } from 'react'

import styles from './LiensDEvitement.module.css'
import { frontDependencies } from '../../../configuration/frontDependencies'

export default function LiensDEvitement(): ReactElement {
  return (
    <nav
      aria-label={frontDependencies.wording.ACCES_RAPIDE}
      id="evitement"
    >
      <ul className={styles.evitement}>
        <li>
          <a href="#contenu">
            {frontDependencies.wording.EVITEMENT_ALLER_AU_CONTENU}
          </a>
        </li>
        <li>
          <a href="#menu">
            {frontDependencies.wording.EVITEMENT_ALLER_AU_MENU}
          </a>
        </li>
        <li>
          <a href="#footer">
            {frontDependencies.wording.EVITEMENT_ALLER_AU_PIED_DE_PAGE}
          </a>
        </li>
      </ul>
    </nav>
  )
}
