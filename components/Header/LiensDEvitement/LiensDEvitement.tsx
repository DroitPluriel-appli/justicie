import Link from 'next/link'
import { ReactElement } from 'react'

import { useDependencies } from '../../../configuration/useDependencies'
import styles from './LiensDEvitement.module.css'

export default function LiensDEvitement(): ReactElement {
  const { wording } = useDependencies()

  return (
    <nav
      aria-label={wording.ACCES_RAPIDE}
      id="evitement-container"
    >
      <ul
        className={styles.evitement}
        id="evitement"
      >
        <li>
          <Link
            href="#contenu"
            scroll={false}
          >
            {wording.EVITEMENT_ALLER_AU_CONTENU}
          </Link>
        </li>
      </ul>
    </nav>
  )
}
