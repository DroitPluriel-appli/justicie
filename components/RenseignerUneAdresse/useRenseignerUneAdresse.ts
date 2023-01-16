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
  const { isTheGoodKeyCode, paths, useRouter, wording } = useDependencies()
  const { push } = useRouter()
  const [isDisabled, setIsDisabled] = useState<boolean>(true)
  const [isEmpty, setIsEmpty] = useState<boolean>(false)
  const [adresseSelectionnee, setAdresseSelectionnee] = useState<string>('')
  const [libelleDesAdresses, setLibelleDesAdresses] = useState<AdressesJson>({ features: [] })

  const suggestionDAdresse = async (query: string, populateResults: (labelDesAdresses: string[]) => void): Promise<void> => {
    try {
      const apiAdresse = new URL('https://api-adresse.data.gouv.fr/search/')
      apiAdresse.searchParams.append('q', query)

      const response = await fetch(apiAdresse)
      const adressesFiltrees = await response.json() as AdressesJson
      setLibelleDesAdresses(adressesFiltrees)

      const labelDesAdresses = adressesFiltrees.features.map((adresse) => adresse.properties.label)
      populateResults(labelDesAdresses)
    } catch (error) {
      setIsEmpty(true)
      populateResults([])
    }
  }

  const effaceLAdresseAuTouch = useCallback(() => {
    // @ts-ignore
    document.querySelector('input').value = ''
    setIsDisabled(true)
  }, [])

  const effaceLAdresseAuKeyDown = useCallback((event: KeyboardEvent<HTMLButtonElement>) => {
    if (isTheGoodKeyCode(event)) {
      // @ts-ignore
      document.querySelector('input').value = ''
      setIsDisabled(true)
    }
  }, [isTheGoodKeyCode])

  const selectionneUneAdresse = useCallback((adresse: string) => {
    if (adresse !== undefined) {
      setIsDisabled(false)
      setAdresseSelectionnee(adresse)
    }
  }, [])

  const debounce = (func: (query: string, populateResults: (labelDesAdresses: string[]) => void) => Promise<void>, delay: number) => {
    let timeoutId: NodeJS.Timeout

    return (...args: [query: string, populateResults: (labelDesAdresses: string[]) => void]) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        // @ts-ignore
        void func.apply(this, args)
      }, delay)
    }
  }

  const vaAlEtape2 = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    async function goToRechercherParHandicap(coordonneesGeospatiales: AdresseJson) {
      await push(`${paths.RECHERCHER_PAR_HANDICAP}?lat=${coordonneesGeospatiales.geometry.coordinates[1]}&lon=${coordonneesGeospatiales.geometry.coordinates[0]}`)
    }

    const coordonneesGeospatiales = libelleDesAdresses.features.find((adresse): boolean => adresseSelectionnee === adresse.properties.label)
    void goToRechercherParHandicap(coordonneesGeospatiales as AdresseJson)
  }, [adresseSelectionnee, paths.RECHERCHER_PAR_HANDICAP, push, libelleDesAdresses.features])

  const noticeDesResultats = useCallback(() => wording.NOTICE_DES_RESULTATS, [wording.NOTICE_DES_RESULTATS])

  const apiAdresseNeRepondPlus = useCallback(() => wording.API_ADRESSE_NE_REPOND_PLUS, [wording.API_ADRESSE_NE_REPOND_PLUS])

  return {
    apiAdresseNeRepondPlus,
    effaceLAdresseAuKeyDown,
    effaceLAdresseAuTouch,
    isDisabled,
    isEmpty,
    noticeDesResultats,
    selectionneUneAdresse,
    suggestionDAdresse: debounce(suggestionDAdresse, 500),
    vaAlEtape2,
  }
}
