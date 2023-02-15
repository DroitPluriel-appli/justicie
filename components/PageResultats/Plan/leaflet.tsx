import L, { Circle, Map } from 'leaflet'
import { createRoot } from 'react-dom/client'

import { Lieu } from '../../../backend/entities/Lieu'
import CarteLieu from '../CarteLieu/CarteLieu'

export const setMarkerPosition = (viewCenter: L.LatLngExpression, title: string): L.Marker => {
  const markerPositionSize = 25
  const iconMarkerPosition = L.icon({
    iconAnchor: [markerPositionSize / 2, markerPositionSize / 2],
    iconSize: [markerPositionSize, markerPositionSize],
    iconUrl: 'marker-position.svg',
  })

  return L.marker(viewCenter, { icon: iconMarkerPosition, title: title })
}

export const setMarkersLieux = (lieux: Lieu[], latitude: number, longitude: number): L.Marker[] => {
  const markerLieuSizeDefault = 24
  const iconMarkerLieuDefault = L.icon({
    iconAnchor: [markerLieuSizeDefault / 2, markerLieuSizeDefault],
    iconSize: [markerLieuSizeDefault, markerLieuSizeDefault],
    iconUrl: 'marker-lieu.svg',
    popupAnchor: [0, -0.6 * markerLieuSizeDefault],
  })
  const markerLieuSizeSelected = 38
  const iconMarkerLieuSelected = L.icon({
    iconAnchor: [markerLieuSizeSelected / 2, markerLieuSizeSelected],
    iconSize: [markerLieuSizeSelected, markerLieuSizeSelected],
    iconUrl: 'marker-lieu-selected.svg',
    popupAnchor: [0, -0.6 * markerLieuSizeSelected],
  })

  const markersLieux = lieux.map((lieu) => {
    const popupContentContainer = L.DomUtil.create('div')
    const popup = L.popup().setContent(popupContentContainer)

    // Puisqu'on utilise leaflet et pas react-leaflet,
    // on ne peut pas passer du JSX à la popup.
    // Il faut donc faire le rendu au préalable
    createRoot(popupContentContainer).render(
      <CarteLieu
        latitude={latitude}
        lieu={lieu}
        longitude={longitude}
      />
    )

    return L.marker(
      [lieu.latitude, lieu.longitude],
      { icon: iconMarkerLieuDefault, title: lieu.nom }
    )
      .on('click', ({ sourceTarget }: { sourceTarget: L.Marker }) => {
        markersLieux.forEach((marker) => marker.setIcon(iconMarkerLieuDefault))
        sourceTarget.setIcon(iconMarkerLieuSelected)
      })
      .on('popupclose', ({ sourceTarget }: { sourceTarget: L.Marker }) => {
        sourceTarget.setIcon(iconMarkerLieuDefault)
      })
      .bindPopup(popup)
  })

  return markersLieux
}

export const setCircleRayonDeRecherche = (rayonDeRecherche: number, viewCenter: L.LatLngTuple): Circle => {
  const conversionKilometresEnMetres = (kilometres: number): number => 1000 * kilometres

  return L.circle(
    viewCenter,
    {
      color: '#221ed3',
      fill: false,
      radius: conversionKilometresEnMetres(rayonDeRecherche),
    }
  )
}

export const initPlan = (lieux: Lieu[], latitude: number, longitude: number, rayonDeRecherche: number, titreMarkerPosition: string): Map => {
  const credits = '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  const defaultZoom = 15
  const maxZoom = 19
  const tileLayerUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
  const viewCenter: L.LatLngTuple = [latitude, longitude]
  const mapLayer = L.tileLayer(tileLayerUrl, {
    attribution: credits,
    maxZoom: maxZoom,
  })

  const map = L.map('map')
    .setView(viewCenter, defaultZoom)
    .addLayer(mapLayer)
    .addLayer(setMarkerPosition(viewCenter, titreMarkerPosition))
  setCircleRayonDeRecherche(rayonDeRecherche, viewCenter).addTo(map)

  setMarkersLieux(lieux, latitude, longitude)
    .forEach((lieu) => lieu.addTo(map))

  return map
}
