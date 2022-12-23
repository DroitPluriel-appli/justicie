import dynamic from 'next/dynamic'
import { ReactElement } from 'react'

import { recupereDesLieux } from '../backend/repository/lieuxRepository'
import { LieuModel } from '../database/models/EntitéJuridiqueModel'

export default function PageResultatsParPlan({ lieux }: { lieux: LieuModel[] }): ReactElement {

  const Plan = dynamic(() => import('../components/Resultats/ResultatsPlan'), { ssr: false })

  return (
    <Plan
      lieux={lieux}
    />
  )
}

export async function getServerSideProps() {
  const lieux = await recupereDesLieux()

  return { props: { lieux } }
}
