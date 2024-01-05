import { ReactElement } from 'react'

import styles from './BoutonModeSombre.module.css'
import { useBoutonModeSombre } from './useBoutonModeSombre'
import { frontDependencies } from '../../../configuration/frontDependencies'

export function BoutonModeSombre(): ReactElement {
  const { isEnabled, toggleIsEnabled } = useBoutonModeSombre()

  return (
    <button
      aria-pressed={isEnabled}
      className={`${styles.main} ${isEnabled ? styles.enabled : ''}`}
      onClick={toggleIsEnabled}
      type="button"
    >
      <svg
        aria-hidden
        height="26"
        viewBox="0 0 49 26"
        width="49"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          height="23"
          rx="11.5"
          width="46"
          x="1.5"
          y="1.5"
        />
        <circle
          cx="14"
          cy="13"
          r="9"
        />
      </svg>
      {frontDependencies.wording.MODE_SOMBRE}
    </button>
  )
}
