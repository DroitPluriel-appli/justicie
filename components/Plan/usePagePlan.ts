import { ParsedUrlQuery } from 'querystring'

// getPosition est supposé être appelé durant
// le chargement de la page,
// à la différence des fonctions de usePlan
// qui doivent être appelées APRÈS, une fois que window existe.
// Si on charge les fonctions de usePlan en même temps que getPositoin,
// on a une erreur "window is undefined".
// C'est pour ça que qu'il y a fichiers séparés :
// usePagePlan et usePage
export default function usePagePlan() {
  const getPosition = (query: ParsedUrlQuery): L.LatLngExpression | undefined => {
    const lat = parseFloat(query.lat as string)
    const lon = parseFloat(query.lon as string)

    if (isNaN(lat) || isNaN(lon)) {
      return undefined
    }

    return [lat, lon] as L.LatLngExpression
  }
  return { getPosition }
}
