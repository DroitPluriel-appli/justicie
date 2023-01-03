import dynamic from 'next/dynamic'
import { ReactElement } from 'react'

import usePagePlan from '../../components/Resultats/useResultatsPlan'
import { useDependencies } from '../../configuration/useDependencies'
import { LieuModel } from '../../database/models/LieuModel'

export default function ResultatsPlan({ lieux }: { lieux: LieuModel[] }): ReactElement {

  const { useRouter, wording } = useDependencies()
  const { query } = useRouter()
  const { queryToLatLngExpression } = usePagePlan()

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
