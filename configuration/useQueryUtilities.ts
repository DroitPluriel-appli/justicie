import { ParsedUrlQuery } from 'querystring'

export function useQueryUtilities() {
  const latLongQueryIsInvalid = (query: ParsedUrlQuery): boolean => !Number(query.lat) || !Number(query.lon)

  return { latLongQueryIsInvalid: latLongQueryIsInvalid }
}
