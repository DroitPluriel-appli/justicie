import { useCallback } from 'react'

import { useDependencies } from '../../configuration/useDependencies'

export function useRechercherParHandicap() {
  const { useRouter } = useDependencies()
  const { back, query } = useRouter()

  const retourEnArriere = useCallback(() => {
    back()
  }, [back])

  const hasLatOrLon = !Number(query.lat) || !Number(query.lon)

  return { hasLatOrLon, retourEnArriere }
}
