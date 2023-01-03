import dynamic from 'next/dynamic'
import { ReactElement } from 'react'

import { Lieu } from '../../backend/entities/Lieu'
import useResultatsPlan from '../../components/Resultats/useResultatsPlan'
import { useDependencies } from '../../configuration/useDependencies'
import { useQueryUtilities } from '../../configuration/useQueryUtilities'

export default function ResultatsPlan({ lieux }: { lieux: Lieu[] }): ReactElement {
  const { useRouter, wording } = useDependencies()
  const { query } = useRouter()
  const { queryToLatLngExpression } = useResultatsPlan()
  const { isValidLatLonQuery } = useQueryUtilities()

  const Plan = dynamic(() => import('../../components/Resultats/Plan'), { ssr: false })

  if (isValidLatLonQuery(query)) {
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
