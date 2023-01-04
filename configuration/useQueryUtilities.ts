import { ParsedUrlQuery } from 'querystring'

export function useQueryUtilities() {
  const isValidLatLonQuery = (query: ParsedUrlQuery): boolean => !Number(query.lat) || !Number(query.lon)

  return { isValidLatLonQuery }
}
