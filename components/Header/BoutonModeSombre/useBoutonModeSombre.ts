import { useCallback, useEffect, useState } from 'react'

import { isDarkThemeInLocalStorage, toggleDarkTheme } from '../../common/theme'

export function useBoutonModeSombre() {
  const [isEnabled, setIsEnabled] = useState<boolean>(false)

  const toggleIsEnabled = () => {
    setIsEnabled(!isEnabled)
    toggleDarkTheme()
  }

  useEffect(() => {
    setIsEnabled(isDarkThemeInLocalStorage())
  }, [setIsEnabled])

  return { isEnabled, setIsEnabled, toggleIsEnabled: useCallback(toggleIsEnabled, [isEnabled]) }
}
