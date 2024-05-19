import { useEffect, useState } from 'react'

import { frontDependencies } from '../../configuration/frontDependencies'
import { useDependencies } from '../../configuration/useDependencies'

type State = Readonly<{
  buttonName: string
  isDisabled: boolean
  isGPSDenied: boolean
  latitude: number
  longitude: number
}>

type UsePageRechercherUneAideJuridique = Readonly<{
  buttonName: string
  isDisabled: boolean
  isGPSDenied: boolean
  touch: () => void
}>

export function usePageRechercherUneAideJuridique(): UsePageRechercherUneAideJuridique {
  const { useRouter } = useDependencies()
  const { paths, wording } = frontDependencies
  const [state, setState] = useState<State>({
    buttonName: wording.UTILISER_MA_POSITION_ACTUELLE,
    isDisabled: false,
    isGPSDenied: false,
    latitude: 0,
    longitude: 0,
  })
  const router = useRouter()

  const touch = () => {
    hasGeoloc()
  }

  useEffect(() => {
    if (state.latitude !== 0 && state.longitude !== 0) {
      router.push(`${paths.RECHERCHER_PAR_HANDICAP}?lat=${state.latitude}&lon=${state.longitude}`)
    }

  }, [router, paths.RECHERCHER_PAR_HANDICAP, state])

  useEffect(() => {
    async function isGPSDenied() {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, @typescript-eslint/strict-boolean-expressions
      if (navigator.permissions) {
        const result = await navigator.permissions.query({ name: 'geolocation' })

        if (result.state === 'denied') {
          setState((state): State => ({
            ...state,
            isDisabled: true,
            isGPSDenied: true,
          }))
        }
      }
    }

    void isGPSDenied()
  }, [])

  const hasGeoloc = () => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, @typescript-eslint/strict-boolean-expressions
    if (navigator.geolocation) {
      setState((state): State => ({
        ...state,
        buttonName: wording.CHARGEMENT,
        isDisabled: true,
      }))
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((state): State => ({
            ...state,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }))
        },
        () => {
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          if (navigator.permissions === undefined) {
            setState((state): State => ({
              ...state,
              isDisabled: false,
              isGPSDenied: true,
            }))
          } else {
            setState((state): State => ({
              ...state,
              buttonName: wording.UTILISER_MA_POSITION_ACTUELLE,
              isDisabled: false,
            }))
          }
        }
      )
    }
  }

  return {
    buttonName: state.buttonName,
    isDisabled: state.isDisabled,
    isGPSDenied: state.isGPSDenied,
    touch,
  }
}
