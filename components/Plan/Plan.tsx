import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { ReactElement, useEffect } from 'react'

import { useDependencies } from '../../configuration/useDependencies'
import usePlan from './usePlan'

type PlanProps = Readonly<{
  lieux: { latLon: L.LatLngExpression, title: string }[]
  viewCenter: L.LatLngExpression
}>

export default function Plan({ lieux, viewCenter }: PlanProps): ReactElement {
  const { wording } = useDependencies()
  const { setMarkerPosition, setMarkersLieux } = usePlan()

  const mapLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    })

  useEffect(() => {
    const map = L.map('map')
      .setView(viewCenter, 13)
      .addLayer(mapLayer)
      .addLayer(setMarkerPosition(viewCenter, wording.TITRE_MARKER_POSITION))

    const markersLieux = setMarkersLieux(lieux)
    markersLieux.map((lieu) => lieu.addTo(map))

    // Si la carte n'est pas supprimée quand le composant update,
    // cela peut provoquer des bugs liés à leaflet, notamment
    // que la carte ne soit plus draggable. Ici on supprime la map
    // automatiquement avant chaque update du composant.
    return () => {
      map.remove()
    }
  })

  return (
    <div
      className="leafletMap"
      id="map"
    />
  )
}
