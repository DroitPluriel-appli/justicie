import { FormEvent, useCallback, useState } from 'react'

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

type State = Readonly<{
  adresseSelectionnee: string
  isDisabled: boolean
  isEmpty: boolean
  libelleDesAdresses: AdressesJson
}>

export function usePageRenseignerUneAdresse() {
  const { paths, useRouter, wording } = useDependencies()
  const { push } = useRouter()
  const [state, setState] = useState<State>({
    adresseSelectionnee: '',
    isDisabled: true,
    isEmpty: false,
    libelleDesAdresses: { features: [] },
  })

  const suggestionDAdresse = async (query: string, populateResults: (labelDesAdresses: string[]) => void): Promise<void> => {
    try {
      const apiAdresse = new URL('https://api-adresse.data.gouv.fr/search/')
      apiAdresse.searchParams.append('q', query)

      const response = await fetch(apiAdresse)
      const libelleDesAdressesFiltrees = await response.json() as AdressesJson
      setState({
        ...state,
        libelleDesAdresses: libelleDesAdressesFiltrees,
      })

      const labelDesAdresses = libelleDesAdressesFiltrees.features.map((adresse): string => adresse.properties.label)
      populateResults(labelDesAdresses)
    } catch (error) {
      setState({
        ...state,
        isEmpty: true,
      })
      populateResults([])
    }
  }

  const effaceLAdresseAuTouch = useCallback(() => {
    // @ts-ignore
    document.querySelector('input').value = ''
    setState((state) => ({
      ...state,
      isDisabled: true,
    }))
  }, [])

  const selectionneUneAdresse = useCallback((adresse: string) => {
    if (adresse !== undefined) {
      setState((state) => ({
        ...state,
        adresseSelectionnee: adresse,
        isDisabled: false,
      }))
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

    const coordonneesGeospatiales = state.libelleDesAdresses.features.find((adresse): boolean => state.adresseSelectionnee === adresse.properties.label)
    void goToRechercherParHandicap(coordonneesGeospatiales as AdresseJson)
  }, [state.adresseSelectionnee, paths.RECHERCHER_PAR_HANDICAP, push, state.libelleDesAdresses.features])

  const noticeDesResultats = useCallback((): string => wording.NOTICE_DES_RESULTATS, [wording.NOTICE_DES_RESULTATS])

  const apiAdresseNeRepondPlus = useCallback((): string => wording.API_ADRESSE_NE_REPOND_PLUS, [wording.API_ADRESSE_NE_REPOND_PLUS])

  return {
    apiAdresseNeRepondPlus,
    effaceLAdresseAuTouch,
    isDisabled: state.isDisabled,
    isEmpty: state.isEmpty,
    noticeDesResultats,
    selectionneUneAdresse,
    suggestionDAdresse: debounce(suggestionDAdresse, 500),
    vaAlEtape2,
  }
}
