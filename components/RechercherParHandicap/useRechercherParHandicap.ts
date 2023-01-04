import { useCallback } from 'react'

import { useDependencies } from '../../configuration/useDependencies'
import { useQueryUtilities } from '../../configuration/useQueryUtilities'

export function useRechercherParHandicap() {
  const { useRouter } = useDependencies()
  const { back, query } = useRouter()
  const { latLongQueryIsInvalid } = useQueryUtilities()

  const retourEnArriere = useCallback(() => {
    back()
  }, [back])

  const hasLatOrLon = latLongQueryIsInvalid(query)

  return { hasLatOrLon, retourEnArriere }
}
