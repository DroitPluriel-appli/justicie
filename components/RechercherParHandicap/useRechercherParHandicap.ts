import { useCallback } from 'react'

import { useDependencies } from '../../configuration/useDependencies'

export function useRechercherParHandicap() {
  const { useRouter } = useDependencies()
  const { back } = useRouter()

  const retourEnArriere = useCallback(() => {
    back()
  }, [back])

  return { retourEnArriere }
}
