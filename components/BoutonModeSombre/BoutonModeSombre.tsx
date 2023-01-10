import { ReactElement } from 'react'

import { useTheme } from '../../configuration/useTheme'
import styles from './BoutonModeSombre.module.css'

export function BoutonModeSombre(): ReactElement {
  const { toggleDarkTheme } = useTheme()

  return (
    <label className={styles.main}>
      <input
        onClick={toggleDarkTheme}
        title="modeSombre"
        type="checkbox"
      />
      <span className={styles.slider} />
    </label>
  )
}
