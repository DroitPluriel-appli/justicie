import { useRouter } from 'next/router'
import { FormEvent, KeyboardEvent, useCallback, useState } from 'react'

import { useDependencies } from '../../configuration/useDependencies'

export type AdresseJson = Readonly<{
  geometry: {
    coordinates: number[]
  }
  properties: {
    label: string
  }
}>

type AdressesJson = Readonly<{
  features: AdresseJson[]
}>

export function useRenseignerUneAdresse() {
  const { isTheGoodKeyCode, paths } = useDependencies()
  const { push } = useRouter()
  const [isDisabled, setIsDisabled] = useState<boolean>(true)
  const [adresseSelectionnee, setAdresseSelectionnee] = useState<string>('')
  const [libelleDesadresses, setLibelleDesAdresses] = useState<AdressesJson>({
    features: [
      {
        geometry: {
          coordinates: [
            5.36978,
            43.296482,
          ],
        },
        properties:{ label: 'france' },
      },
      {
        geometry: {
          coordinates: [
            5.36978,
            43.296482,
          ],
        },
        properties:{ label: 'france' },
      },
      {
        geometry: {
          coordinates: [
            5.36978,
            43.296482,
          ],
        },
        properties:{ label: 'germany' },
      },
    ],
  })

  const suggestion = useCallback((query: string, populateResults: (adressesFiltrees: string[]) => void) => {
    const adressesFiltrees = libelleDesadresses.features
      .filter((adresse) => adresse.properties.label.indexOf(query) !== -1)
      .map((adresse) => adresse.properties.label)
    populateResults(adressesFiltrees)
  }, [libelleDesadresses])

  const touch = useCallback(() => {
    // @ts-ignore
    document.querySelector('input').value = ''
  }, [])

  const keyDown = useCallback((event: KeyboardEvent<HTMLButtonElement>) => {
    if (isTheGoodKeyCode(event)) {
      // @ts-ignore
      document.querySelector('input').value = ''
    }
  }, [isTheGoodKeyCode])

  const onConfirm = useCallback((adresse: string) => {
    setIsDisabled(false)
    if (adresse !== undefined) {
      setAdresseSelectionnee(adresse)
    }
  }, [])

  const submit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    async function goToRechercherParHandicap(coordonneesGeospatiales: AdresseJson) {
      await push(`/${paths.RECHERCHER_PAR_HANDICAP}?lat=${coordonneesGeospatiales.geometry.coordinates[1]}&lon=${coordonneesGeospatiales.geometry.coordinates[0]}`)
    }

    const coordonneesGeospatiales = libelleDesadresses.features.find((adresse): boolean => adresseSelectionnee === adresse.properties.label)
    void goToRechercherParHandicap(coordonneesGeospatiales as AdresseJson)
  }, [adresseSelectionnee, paths.RECHERCHER_PAR_HANDICAP, push, libelleDesadresses.features])

  return { isDisabled, keyDown, onConfirm, submit, suggestion, touch }
}
