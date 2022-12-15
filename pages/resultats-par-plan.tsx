import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'

import usePagePlan from '../components/Plan/usePagePlan'

export default function PageResultatsParPlan(): ReactElement {

  const { query } = useRouter()
  const { getPosition } = usePagePlan()
  const planViewCenter = getPosition(query)

  const fakeLieux = [
    {
      latLon: [51.500, -0.09] as L.LatLngExpression,
      title: 'FakeLieuA',
    },
    {
      latLon: [51.520, -0.09] as L.LatLngExpression,
      title: 'FakeLieuB',
    },
    {
      latLon: [51.505, -0.07] as L.LatLngExpression,
      title: 'FakeLieuC',
    },
  ]
  const Plan = dynamic(() => import('../components/Plan/Plan'), { ssr: false })
  if (planViewCenter !== undefined) {
    return (
      <Plan
        lieux={fakeLieux}
        viewCenter={planViewCenter}
      />
    )
  } else {
    return (
      <h2>
        {'Erreur : position invalide'}
      </h2>
    )
  }
}
