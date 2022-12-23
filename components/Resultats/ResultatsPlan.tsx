import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import Head from 'next/head'
import { ReactElement, useEffect } from 'react'

import { useDependencies } from '../../configuration/useDependencies'
import { LieuModel } from '../../database/models/EntitéJuridiqueModel'
import EnTete from './EnTete'
import usePagePlan from './usePagePlan'
import useResultatsPlan from './useResultatsPlan'

type PlanProps = Readonly<{
  lieux: LieuModel[]
}>

export default function Plan({ lieux }: PlanProps): ReactElement {
  const { wording, useRouter } = useDependencies()
  const { setMarkerPosition, setMarkersLieux } = useResultatsPlan()
  const { query } = useRouter()
  const { queryToLatLngExpression } = usePagePlan()

  const mapSettings = {
    credits: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    defaultZoom: 15,
    maxZoom: 19,
    tileLayerUrl: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    viewCenter: queryToLatLngExpression(query),
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

  if (query.lat === undefined || query.lon === undefined) {
    return (
      <p>
        {wording.RECOMMENCER_PARCOURS}
      </p>
    )
  }

  return (
    <>
      <Head>
        <title>
          {wording.TITLE_PAGE_RESULTATS_PAR_PLAN}
        </title>
      </Head>
      <EnTete nombreDeLieuxTrouves={lieux.length} />
      <div
        className="leafletMap"
        id="map"
      />
    </>
  )
}
