import { ReactElement } from 'react'

import { useTheme } from '../../configuration/useTheme'

export function BoutonModeSombre(): ReactElement {
  const { toggleDarkTheme } = useTheme()

  return (
    <input
      onClick={toggleDarkTheme}
      title="modeSombre"
      type="checkbox"
    />
  )
}
