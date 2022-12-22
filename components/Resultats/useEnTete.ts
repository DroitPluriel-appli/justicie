import { useDependencies } from '../../configuration/useDependencies'

export function useEnTete() {
  const { paths, useRouter } = useDependencies()
  const { pathname, query } = useRouter()

  const buildUrlWithQueryParams = (url: string): string => `${url}?${Object.entries(query).join('&').replaceAll(',', '=')}`

  const besoinsAccessibilite = Object.entries(query).filter((param): boolean => param[0] !== 'lat' && param[0] !== 'lon').length

  const isListe = pathname.includes(paths.RESULTATS_LISTE)

  return {
    besoinsAccessibilite,
    buildUrlWithQueryParams,
    isListe,
  }
}
