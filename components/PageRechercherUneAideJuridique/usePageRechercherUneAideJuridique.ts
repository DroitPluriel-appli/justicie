import { useCallback, useEffect, useState } from 'react'

import { useDependencies } from '../../configuration/useDependencies'


type State = Readonly<{
  buttonName: string
  isDisabled: boolean
  isGPSDenied: boolean
  latitude: number
  longitude: number
}>

export function usePageRechercherUneAideJuridique() {
  const { paths, useRouter, wording } = useDependencies()
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
      if (navigator.permissions) {
        const result = await navigator.permissions.query({ name: 'geolocation' })

        if (result.state === 'denied') {
          setState((state) => ({
            ...state,
            isDisabled: true,
            isGPSDenied: true,
          }))
        }
      }
    }

    void isGPSDenied()
  }, [])

  const hasGeoloc = useCallback(() => {
    if (navigator.geolocation) {
      setState((state) => ({
        ...state,
        buttonName: wording.CHARGEMENT,
        isDisabled: true,
      }))
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((state) => ({
            ...state,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }))
        },
        () => {
          if (navigator.permissions === undefined) {
            setState((state) => ({
              ...state,
              isDisabled: false,
              isGPSDenied: true,
            }))
          } else {
            setState((state) => ({
              ...state,
              buttonName: wording.UTILISER_MA_POSITION_ACTUELLE,
              isDisabled: false,
            }))
          }
        }
      )
    }
  }, [wording.CHARGEMENT, wording.UTILISER_MA_POSITION_ACTUELLE])

  return {
    buttonName: state.buttonName,
    isDisabled: state.isDisabled,
    isGPSDenied: state.isGPSDenied,
    touch: useCallback(touch, [hasGeoloc]),
  }
}
