import { useRouter } from 'next/router'
import { KeyboardEvent, useCallback, useEffect, useState } from 'react'

import { useDependencies } from '../../configuration/useDependencies'

type coordonneesGeospatiales = Readonly<{
  latitude: number
  longitude: number
}>

type State = Readonly<{
  buttonName: string
  isDisabled: boolean
}>

export function useRechercherUnLieu() {
  const { isTheGoodKeyCode, paths, wording } = useDependencies()
  const [geoloc, setGeoloc] = useState<coordonneesGeospatiales>({
    latitude: 0,
    longitude: 0,
  })
  const [state, setState] = useState<State>({
    buttonName: wording.UTILISER_MA_POSITION_ACTUELLE,
    isDisabled: false,
  })
  const { push } = useRouter()

  const touch = () => {
    hasGeoloc()
  }

  const keyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (isTheGoodKeyCode(event)) {
      hasGeoloc()
    }
  }

  useEffect(() => {
    async function goToRechercherParHandicap() {
      await push(`/${paths.RECHERCHER_PAR_HANDICAP}?lat=${geoloc.latitude}&lon=${geoloc.longitude}`)
    }

    if (geoloc.latitude !== 0 && geoloc.longitude !== 0) {
      void goToRechercherParHandicap()
    }
  }, [geoloc, push, paths.RECHERCHER_PAR_HANDICAP])

  const hasGeoloc = useCallback(() => {
    if (navigator.geolocation) {
      setState({
        buttonName: wording.CHARGEMENT,
        isDisabled: true,
      })
      navigator.geolocation.getCurrentPosition((position) => {
        setGeoloc({ latitude: position.coords.latitude, longitude: position.coords.longitude })
      },
      () => {
        setState({
          buttonName: wording.UTILISER_MA_POSITION_ACTUELLE,
          isDisabled: false,
        })
      })
    }
  }, [wording.CHARGEMENT, wording.UTILISER_MA_POSITION_ACTUELLE])

  return {
    buttonName: state.buttonName,
    isDisabled: state.isDisabled,
    keyDown: useCallback(keyDown, [isTheGoodKeyCode, hasGeoloc]),
    touch: useCallback(touch, [hasGeoloc]),
  }
}
