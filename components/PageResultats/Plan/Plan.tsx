import 'leaflet/dist/leaflet.css'
import { ReactElement, useEffect } from 'react'

import { initPlan } from './leaflet'
import styles from './Plan.module.css'
import { Lieu } from '../../../backend/entities/Lieu'
import { useDependencies } from '../../../configuration/useDependencies'

type PlanProps = Readonly<{
  lieux: Lieu[]
}>

export default function Plan({ lieux }: PlanProps): ReactElement {
  const { rayonDeRecherche, useRouter, wording } = useDependencies()
  const { query } = useRouter()

  useEffect(() => {
    const map = initPlan(lieux, Number(query.lat), Number(query.lon), rayonDeRecherche, wording.TITRE_MARKER_POSITION)

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
      className={styles.leafletMap}
      id="map"
    />
  )
}
