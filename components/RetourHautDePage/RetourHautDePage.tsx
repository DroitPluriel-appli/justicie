import { ReactElement } from 'react'

import { useDependencies } from '../../configuration/useDependencies'
import styles from './RetourHautDePage.module.css'

export default function RetourHautDePage(): ReactElement {
  const { wording } = useDependencies()

  return (
    <a
      className={styles.retour}
      href="#evitement"
    >
      {wording.RETOUR_EN_HAUT_DE_PAGE}
      <svg
        aria-hidden
        height="16"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          d="M8 14.4C4.472 14.4 1.6 11.528 1.6 8C1.6 4.472 4.472 1.6 8 1.6C11.528 1.6 14.4 4.472 14.4 8C14.4 11.528 11.528 14.4 8 14.4ZM8 16C12.416 16 16 12.416 16 8C16 3.584 12.416 0 8 0C3.584 0 0 3.584 0 8C0 12.416 3.584 16 8 16ZM7.2 8V11.2H8.8V8H11.2L8 4.8L4.8 8H7.2Z"
        />
      </svg>
    </a>
  )
}
