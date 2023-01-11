import { ReactElement } from 'react'

import { useDependencies } from '../../configuration/useDependencies'
import { useTheme } from '../../configuration/useTheme'
import styles from './BoutonModeSombre.module.css'
import useBoutonModeSombre from './useBoutonModeSombre'

export function BoutonModeSombre(): ReactElement {
  const { wording } = useDependencies()
  const { toggleDarkTheme } = useTheme()
  const { isEnabled, toggleIsEnabled } = useBoutonModeSombre(toggleDarkTheme)

  return (
    <div className={styles.main}>
      <button
        aria-pressed={isEnabled}
        className={styles.bouton}
        data-enabled={isEnabled}
        id="boutonModeSombre"
        onClick={toggleIsEnabled}
        title="Mode sombre" //TODO: mettre en wording
        type="button"
      />
      <label
        className={styles.label}
        htmlFor="boutonModeSombre"
      >
        {wording.MODE_SOMBRE}
      </label>
    </div>
  )
}
