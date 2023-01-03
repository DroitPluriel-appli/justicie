import { ParsedUrlQuery } from 'querystring'

export default function usePagePlan() {
  const queryToLatLngExpression = (query: ParsedUrlQuery): L.LatLngExpression => {
    const lat = parseFloat(query.lat as string)
    const lon = parseFloat(query.lon as string)

    return [lat, lon] as L.LatLngExpression
  }

  return { queryToLatLngExpression }
}
