import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { ReactElement, useEffect } from 'react'

import { Lieu } from '../../backend/entities/Lieu'
import { useDependencies } from '../../configuration/useDependencies'
import Title from '../Title/Title'
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

  const credits = '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  const defaultZoom = 15
  const maxZoom = 19
  const tileLayerUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
  const viewCenter: L.LatLngTuple = [latitude, longitude]
  const mapLayer = L.tileLayer(tileLayerUrl, {
    attribution: credits,
    maxZoom: maxZoom,
  })

  useEffect(() => {
    if (nombreDeResultat !== 0) {
      const map = L.map('map')
        .setView(viewCenter, defaultZoom)
        .addLayer(mapLayer)
        .addLayer(setMarkerPosition(viewCenter, wording.TITRE_MARKER_POSITION))

      setMarkersLieux(lieux, latitude, longitude)
        .forEach((lieu) => lieu.addTo(map))

      // Si la carte n'est pas supprimée quand le composant update,
      // cela peut provoquer des bugs liés à leaflet, notamment
      // que la carte ne soit plus draggable. Ici on supprime la map
      // automatiquement avant chaque update du composant.
      return () => {
        map.remove()
      }
    }

    return
  })

  return (
    <>
      <Title>
        {wording.TITLE_PAGE_RESULTATS_PAR_PLAN}
      </Title>
      <EnTete nombreDeResultat={nombreDeResultat} />
      {
        nombreDeResultat !== 0 && (
          <div
            className={styles.leafletMap}
            id="map"
          />
        )
      }
    </>
  )
}
