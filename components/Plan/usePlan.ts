import L from 'leaflet'

export default function usePlan() {

  const iconSizeDefault = 24
  const iconSizeSelected = 38
  const iconMarkerLieu = L.icon({
    iconAnchor: [iconSizeDefault / 2, iconSizeDefault],
    iconSize: [iconSizeDefault, iconSizeDefault],
    iconUrl: 'marker-lieu.svg',
  })
  const iconMarkerLieuSelected = L.icon({
    iconAnchor: [iconSizeSelected / 2, iconSizeSelected],
    iconSize: [iconSizeSelected, iconSizeSelected],
    iconUrl: 'marker-lieu-selected.svg',
  })
  const iconMarkerPosition = L.icon({ iconUrl: 'marker_position.svg' })

  const setMarkerPosition = (viewCenter: L.LatLngExpression, title: string): L.Marker => {
    return L.marker(viewCenter, { icon: iconMarkerPosition, title: title })
  }

  const setMarkersLieux = (lieux: { latLon: L.LatLngExpression, title: string }[]): L.Marker[] => {
    const markersLieux = lieux.map((lieu) => L.marker(lieu.latLon, { icon: iconMarkerLieu, title: lieu.title })
      .on('click', ({ sourceTarget }) => {
        markersLieux.map((marker) => marker.setIcon(iconMarkerLieu))
        const target = sourceTarget as L.Marker
        target.setIcon(iconMarkerLieuSelected)
      }))
    return markersLieux
  }

  return { iconSizeDefault, iconSizeSelected, setMarkerPosition, setMarkersLieux }
}
