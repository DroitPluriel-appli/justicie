import { useCallback } from 'react'

import { useDependencies } from '../../configuration/useDependencies'

export function useRechercherParHandicap() {
  const { useRouter } = useDependencies()
  const { back, query } = useRouter()

  const retourEnArriere = useCallback(() => {
    back()
  }, [back])

  const hasLatOrLon = query.lat === undefined || query.lon === undefined

  return { hasLatOrLon, retourEnArriere }
}
