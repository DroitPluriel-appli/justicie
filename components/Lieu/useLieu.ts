import { useCallback } from 'react'

import { useDependencies } from '../../configuration/useDependencies'

export function useLieu() {
  const { useRouter } = useDependencies()
  const { back } = useRouter()

  const retourEnArriere = useCallback(() => {
    back()
  }, [back])

  return { retourEnArriere }
}
