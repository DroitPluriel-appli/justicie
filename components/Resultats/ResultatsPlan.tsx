import dynamic from 'next/dynamic'
import { ReactElement } from 'react'

import { Lieu } from '../../backend/entities/Lieu'
import useResultatsPlan from '../../components/Resultats/useResultatsPlan'
import { useDependencies } from '../../configuration/useDependencies'

export default function ResultatsPlan({ lieux }: { lieux: Lieu[] }): ReactElement {

  const { useRouter, wording } = useDependencies()
  const { query } = useRouter()
  const { queryToLatLngExpression } = useResultatsPlan()

  const Plan = dynamic(() => import('../../components/Resultats/Plan'), { ssr: false })

  if (!Number(query.lat) || !Number(query.lon)) {
    return (
      <p>
        {wording.RECOMMENCER_PARCOURS}
      </p>
    )
  }

  return (
    <Plan
      lieux={lieux}
      viewCenter={queryToLatLngExpression(query)}
    />
  )
}
