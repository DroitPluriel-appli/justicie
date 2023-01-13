import { useCallback, useState } from 'react'

export default function useBoutonModeSombre(actionOnClick: VoidFunction) {
  const [isEnabled, setIsEnabled] = useState(false)
  const toggleIsEnabled = useCallback(() => {
    isEnabled ?
      setIsEnabled(false) :
      setIsEnabled(true)
    actionOnClick()
  }, [actionOnClick, isEnabled])

  return { isEnabled, setIsEnabled, toggleIsEnabled }
}
