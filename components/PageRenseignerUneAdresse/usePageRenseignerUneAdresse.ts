import { FormEvent, useState } from 'react'

import { frontDependencies } from '../../configuration/frontDependencies'
import { useDependencies } from '../../configuration/useDependencies'

export type AdresseJson = Readonly<{
  geometry: {
    coordinates: ReadonlyArray<number>
  }
  properties: {
    label: string
  }
}>

type AdressesJson = Readonly<{
  features: ReadonlyArray<AdresseJson>
}>

type State = Readonly<{
  adresseSelectionnee: string
  isDisabled: boolean
  isEmpty: boolean
  libelleDesAdresses: AdressesJson
}>

type UsePageRenseignerUneAdresse = Readonly<{
  apiAdresseNeRepondPlus: () => string
  effaceLAdresseAuTouch: () => void
  isDisabled: boolean
  isEmpty: boolean
  noticeDesResultats: () => string
  selectionneUneAdresse: (adresse: string) => void
  suggestionDAdresse: (query: string, populateResults: (labelDesAdresses: ReadonlyArray<string>) => void) => void
  vaAlEtape2: (event: FormEvent<HTMLFormElement>) => void
}>

export function usePageRenseignerUneAdresse(): UsePageRenseignerUneAdresse {
  const { useRouter } = useDependencies()
  const { paths, wording } = frontDependencies
  const router = useRouter()
  const [state, setState] = useState<State>({
    adresseSelectionnee: '',
    isDisabled: true,
    isEmpty: false,
    libelleDesAdresses: { features: [] },
  })

  const suggestionDAdresse = async (query: string, populateResults: (labelDesAdresses: ReadonlyArray<string>) => void): Promise<void> => {
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

  const effaceLAdresseAuTouch = () => {
    setState((state) => ({
      ...state,
      isDisabled: true,
    }))
  }

  const selectionneUneAdresse = (adresse: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (adresse !== undefined) {
      setState((state) => ({
        ...state,
        adresseSelectionnee: adresse,
        isDisabled: false,
      }))
    }
  }

  const debounce = (func: (query: string, populateResults: (labelDesAdresses: ReadonlyArray<string>) => void) => Promise<void>, delay: number) => {
    let timeoutId = 0

    return (...args: [query: string, populateResults: (labelDesAdresses: ReadonlyArray<string>) => void]) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        // @ts-expect-error
        // eslint-disable-next-line @typescript-eslint/no-invalid-this
        void func.apply(this, args)
      }, delay, [])
    }
  }

  const vaAlEtape2 = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const coordonneesGeospatiales = state.libelleDesAdresses.features
      .find((adresse): boolean => state.adresseSelectionnee === adresse.properties.label)

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    router.push(`${paths.RECHERCHER_PAR_HANDICAP}?lat=${(coordonneesGeospatiales!).geometry.coordinates[1]}&lon=${(coordonneesGeospatiales!).geometry.coordinates[0]}`)
  }

  const noticeDesResultats = (): string => wording.NOTICE_DES_RESULTATS

  const apiAdresseNeRepondPlus = (): string => wording.API_ADRESSE_NE_REPOND_PLUS

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
