import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import dynamic from 'next/dynamic'
import { ReactElement } from 'react'

import { Lieu } from '../backend/entities/Lieu'
import { recupereDesLieux } from '../backend/infrastructure/gateways/lieuxRepository'
import usePagePlan from '../components/Resultats/usePagePlan'
import { useDependencies } from '../configuration/useDependencies'
import dataSource from '../database/dataSource'
import { LieuModel } from '../database/models/LieuModel'

export default function PageResultatsParPlan({ lieux }: { lieux: LieuModel[] }): ReactElement {

  const { useRouter, wording } = useDependencies()
  const { query } = useRouter()
  const { queryToLatLngExpression } = usePagePlan()

  const Plan = dynamic(() => import('../components/Resultats/ResultatsPlan'), { ssr: false })

  if (query.lat === undefined || query.lon === undefined) {
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

type ServerSidePropsResult = Readonly<{
  lieux: Lieu[]
}>

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<ServerSidePropsResult>> {
  const orm = dataSource.initialize()
  const latitude = Number(context.query.lat)
  const longitude = Number(context.query.lon)
  const page = context.query.page === undefined ? 0 : Number(context.query.page)

  const lieux = await recupereDesLieux(orm, latitude, longitude, page)
  await (await orm).destroy()

  return { props: { lieux } }
}
