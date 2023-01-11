import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import Head from 'next/head'
import { ReactElement, useEffect } from 'react'

import { Lieu } from '../../backend/entities/Lieu'
import { useDependencies } from '../../configuration/useDependencies'
import EnTete from './EnTete'
import styles from './Plan.module.css'
import usePlan from './usePlan'

type PlanProps = Readonly<{
  latitude: number
  lieux: Lieu[]
  longitude: number
  nombreDeResultat: number
}>

export default function Plan({ latitude, lieux, longitude, nombreDeResultat }: PlanProps): ReactElement {
  const { wording } = useDependencies()
  const { setMarkerPosition, setMarkersLieux } = usePlan()

  const mapSettings = {
    credits: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    defaultZoom: 15,
    maxZoom: 19,
    tileLayerUrl: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    viewCenter: [latitude, longitude] as L.LatLngExpression,
  }
  const mapLayer = L.tileLayer(mapSettings.tileLayerUrl, {
    attribution: mapSettings.credits,
    maxZoom: mapSettings.maxZoom,
  })

  useEffect(() => {
    const map = L.map('map')
      .setView(mapSettings.viewCenter, mapSettings.defaultZoom)
      .addLayer(mapLayer)
      .addLayer(setMarkerPosition(mapSettings.viewCenter, wording.TITRE_MARKER_POSITION))

    const markersLieux = setMarkersLieux(lieux, latitude, longitude)
    markersLieux.forEach((lieu) => lieu.addTo(map))

    // Si la carte n'est pas supprimée quand le composant update,
    // cela peut provoquer des bugs liés à leaflet, notamment
    // que la carte ne soit plus draggable. Ici on supprime la map
    // automatiquement avant chaque update du composant.
    return () => {
      map.remove()
    }
  })

  return (
    <>
      <Head>
        <title>
          {wording.TITLE_PAGE_RESULTATS_PAR_PLAN}
        </title>
      </Head>
      <EnTete nombreDeResultat={nombreDeResultat} />
      <div
        className={styles.leafletMap}
        id="map"
      />
    </>
  )
}
