import { useRouter } from 'next/router'
import { KeyboardEvent, useCallback, useEffect, useState } from 'react'

import { useDependencies } from '../../configuration/useDependencies'

type coordonneesGeospatiales = Readonly<{
  latitude: number
  longitude: number
}>

export function useRechercherUnLieu() {
  const { isTheGoodKeyCode, paths } = useDependencies()
  const [geoloc, setGeoloc] = useState<coordonneesGeospatiales>({
    latitude: 0,
    longitude: 0,
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

  function hasGeoloc() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setGeoloc({ latitude: position.coords.latitude, longitude: position.coords.longitude })
      })
    }
  }

  return {
    keyDown: useCallback(keyDown, [isTheGoodKeyCode]),
    touch: useCallback(touch, []),
  }
}
