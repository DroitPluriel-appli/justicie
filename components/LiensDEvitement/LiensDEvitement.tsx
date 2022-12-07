import { ReactElement } from 'react'

import { useDependencies } from '../../configuration/useDependencies'
import styles from './LiensDEvitement.module.css'

export default function LienDEvitement(): ReactElement {
  const { wording } = useDependencies()

  return (
    <ul
      className={styles.evitement}
      id="evitement"
    >
      <li>
        <a href="#contenu">
          <span>
            {wording.EVITEMENT_ALLER_AU_CONTENU}
          </span>
        </a>
      </li>
    </ul>
  )
}
