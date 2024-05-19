import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { isDarkThemeInLocalStorage, toggleDarkTheme } from '../../common/theme'

type UseBoutonModeSombre = Readonly<{
  isEnabled: boolean
  setIsEnabled: Dispatch<SetStateAction<boolean>>
  toggleIsEnabled: () => void
}>

export function useBoutonModeSombre(): UseBoutonModeSombre {
  const [isEnabled, setIsEnabled] = useState<boolean>(false)

  const toggleIsEnabled = () => {
    setIsEnabled(!isEnabled)
    toggleDarkTheme()
  }

  useEffect(() => {
    setIsEnabled(isDarkThemeInLocalStorage())
  }, [setIsEnabled])

  return {
    isEnabled,
    setIsEnabled,
    toggleIsEnabled,
  }
}
