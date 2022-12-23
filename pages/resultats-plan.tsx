import dynamic from 'next/dynamic'
import { ReactElement } from 'react'

import { recupereDesLieux } from '../backend/repository/lieuxRepository'
import usePagePlan from '../components/Resultats/usePagePlan'
import { useDependencies } from '../configuration/useDependencies'
import { LieuModel } from '../database/models/EntitéJuridiqueModel'

export default function PageResultatsParPlan({ lieux }: { lieux: LieuModel[] }): ReactElement {

  const { useRouter } = useDependencies()
  const { query } = useRouter()
  const { getPosition } = usePagePlan()
  const planViewCenter = getPosition(query)

  const Plan = dynamic(() => import('../components/Resultats/ResultatsPlan'), { ssr: false })

  if (planViewCenter !== undefined) {
    return (
      <Plan
        lieux={lieux}
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

export async function getServerSideProps() {
  const lieux = await recupereDesLieux()

  return { props: { lieux } }
}
