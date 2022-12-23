import { ParsedUrlQuery } from 'querystring'

// getPosition est supposé être appelé durant
// le chargement de la page,
// à la différence des fonctions de useResultatsPlan
// qui doivent être appelées APRÈS, une fois que window existe.
// Si on charge les fonctions de useResultatsPlan en même temps que getPositoin,
// on a une erreur "window is undefined".
// C'est pour ça que qu'il y a fichiers séparés :
// usePagePlan et useResultatsPlan
export default function usePagePlan() {
  const queryToLatLngExpression = (query: ParsedUrlQuery): L.LatLngExpression => {
    const lat = parseFloat(query.lat as string)
    const lon = parseFloat(query.lon as string)

    return [lat, lon] as L.LatLngExpression
  }

  return { queryToLatLngExpression }
}
