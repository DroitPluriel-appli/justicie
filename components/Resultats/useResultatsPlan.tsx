import L from 'leaflet'
import { createRoot } from 'react-dom/client'

import { LieuModel } from '../../database/models/EntitéJuridiqueModel'
import CarteLieu from '../CarteLieu'

export default function useResultatsPlan() {

  const iconSizeDefault = 24
  const iconSizeSelected = 38
  const iconMarkerLieuDefault = L.icon({
    iconAnchor: [iconSizeDefault / 2, iconSizeDefault],
    iconSize: [iconSizeDefault, iconSizeDefault],
    iconUrl: 'marker-lieu.svg',
    popupAnchor: [0, -0.6 * iconSizeDefault],
  })
  const iconMarkerLieuSelected = L.icon({
    iconAnchor: [iconSizeSelected / 2, iconSizeSelected],
    iconSize: [iconSizeSelected, iconSizeSelected],
    iconUrl: 'marker-lieu-selected.svg',
    popupAnchor: [0, -0.6 * iconSizeSelected],
  })
  const iconMarkerPosition = L.icon({ iconUrl: 'marker_position.svg' })

  const setMarkerPosition = (viewCenter: L.LatLngExpression, title: string): L.Marker => {
    return L.marker(viewCenter, { icon: iconMarkerPosition, title: title })
  }

  const setMarkersLieux = (lieux: LieuModel[]): L.Marker[] => {

    const markersLieux = lieux.map((lieu) => {
      const popupContentContainer = L.DomUtil.create('div')
      const popup = L.popup().setContent(popupContentContainer)

      // Puisqu'on utilise leaflet et pas react-leaflet,
      // on ne peut pas passer du JSX à la popup.
      // Il faut donc faire le rendu au préalable
      createRoot(popupContentContainer).render(
        <CarteLieu lieu={lieu} />
      )

      return L.marker(
        [lieu.latitude, lieu.longitude] as L.LatLngExpression,
        { icon: iconMarkerLieuDefault, title: lieu.nom }
      )
        .on('click', ({ sourceTarget }) => {
          markersLieux.map((marker) => marker.setIcon(iconMarkerLieuDefault))
          const target = (sourceTarget as L.Marker)
          target.setIcon(iconMarkerLieuSelected)
        })
        .on('popupclose', ({ sourceTarget }) => {
          const target = (sourceTarget as L.Marker)
          target.setIcon(iconMarkerLieuDefault)
        })
        .bindPopup(popup)
    })

    return markersLieux
  }

  return { iconSizeDefault, iconSizeSelected, setMarkerPosition, setMarkersLieux }
}
