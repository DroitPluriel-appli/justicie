import { ParsedUrlQuery } from 'querystring'

export function useQueryUtilities() {
  const isLatLongQueryInvalid = (query: ParsedUrlQuery): boolean => !Number(query.lat) || !Number(query.lon)

  return { isLatLongQueryInvalid }
}
