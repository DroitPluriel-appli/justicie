import { ParsedUrlQuery } from 'querystring'

import { Paths } from '../../configuration/Paths'

export const besoinsAccessibilite = (query: ParsedUrlQuery): number => Object.entries(query).filter((param): boolean => param[0] !== 'lat' && param[0] !== 'lon' && param[0] !== 'page').length

export const isListe = (pathname: string, paths: Paths): boolean => pathname.includes(paths.RESULTATS_LISTE)

export const transformerIteratorEnObject = (iterator: IterableIterator<[string, string]>): Record<string, string> => {
  const params: Record<string, string> = {}

  for (const [key, value] of iterator) {
    params[key] = value
  }

  return params
}
