import L from 'leaflet'
import { createRoot } from 'react-dom/client'

import CarteLieu from '../CarteLieu'

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

    const markersLieux = lieux.map((lieu) => {
      const popupContentContainer = L.DomUtil.create('div')
      const popup = L.popup().setContent(popupContentContainer)

      // Puisqu'on utilise leaflet et pas react-leaflet,
      // on ne peut pas passer du JSX à la popup.
      // Il faut donc faire le rendu au préalable
      createRoot(popupContentContainer).render(
        <CarteLieu
          adresse="34 Avenue de l'opéra, 75002 Paris"
          categories={['Généraliste', 'Famille']}
          distance="2,1km"
          telephone="01 02 03 04 05"
          title={lieu.title}
        />
      )

      return L.marker(lieu.latLon, { icon: iconMarkerLieu, title: lieu.title })
        .on('click', ({ sourceTarget }) => {
          markersLieux.map((marker) => marker.setIcon(iconMarkerLieu))
          const target = sourceTarget as L.Marker
          target.setIcon(iconMarkerLieuSelected)
        })
        .bindPopup(popup)
    })

    return markersLieux
  }

  return { iconSizeDefault, iconSizeSelected, setMarkerPosition, setMarkersLieux }
}
