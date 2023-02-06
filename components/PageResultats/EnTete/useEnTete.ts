import { useDependencies } from '../../../configuration/useDependencies'

export function useEnTete() {
  const { paths, useRouter } = useDependencies()
  const { pathname, query } = useRouter()

  const buildUrlWithQueryParams = (url: string): string => `${url}?${Object.entries(query).join('&').replace(/,/g, '=')}`.replace(/&page=\d*/, '')

  const besoinsAccessibilite = Object.entries(query).filter((param): boolean => param[0] !== 'lat' && param[0] !== 'lon' && param[0] !== 'page').length

  const isListe = pathname.includes(paths.RESULTATS_LISTE)

  return {
    besoinsAccessibilite,
    buildUrlWithQueryParams,
    isListe,
  }
}
