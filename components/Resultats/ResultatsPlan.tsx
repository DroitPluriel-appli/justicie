import dynamic from 'next/dynamic'
import { ReactElement } from 'react'

import { Lieu } from '../../backend/entities/Lieu'
import { useDependencies } from '../../configuration/useDependencies'
import { useQueryUtilities } from '../../configuration/useQueryUtilities'

export default function ResultatsPlan({ lieux }: { lieux: Lieu[] }): ReactElement {
  const { useRouter, wording } = useDependencies()
  const { query } = useRouter()
  const { latLongQueryIsInvalid } = useQueryUtilities()

  const Plan = dynamic(() => import('../../components/Resultats/Plan'), { ssr: false })

  if (latLongQueryIsInvalid(query)) {
    return (
      <p>
        {wording.RECOMMENCER_PARCOURS}
      </p>
    )
  }

  return (
    <Plan
      lieux={lieux}
      origin={{ lat: Number(query.lat), lon: Number(query.lon) }}
    />
  )
}
