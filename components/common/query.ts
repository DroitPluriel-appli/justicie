import { ParsedUrlQuery } from 'querystring'

import { Paths } from '../../configuration/Paths'

export const buildUrlWithQueryParams = (query: ParsedUrlQuery, url: string): string => `${url}?${Object.entries(query).join('&').replace(/,/g, '=')}`.replace(/&page=\d*/, '')

export const besoinsAccessibilite = (query: ParsedUrlQuery): number => Object.entries(query).filter((param): boolean => param[0] !== 'lat' && param[0] !== 'lon' && param[0] !== 'page').length

export const isListe = (pathname: string, paths: Paths): boolean => pathname.includes(paths.RESULTATS_LISTE)
