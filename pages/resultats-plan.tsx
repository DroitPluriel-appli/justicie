import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { ReactElement } from 'react'

import { backDependencies } from '../backend/backDependencies'
import { Lieu } from '../backend/entities/Lieu'
import ResultatsPlan from '../components/Resultats/ResultatsPlan'

export default function PageResultatsParPlan({ lieux }: { lieux: Lieu[] }): ReactElement {
  return <ResultatsPlan lieux={lieux} />
}

type ServerSidePropsResult = Readonly<{
  lieux: Lieu[]
}>

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<ServerSidePropsResult>> {
  const { lieuLoader } = backDependencies()
  const latitude = Number(context.query.lat)
  const longitude = Number(context.query.lon)
  const page = context.query.page === undefined ? 0 : Number(context.query.page)

  const lieux = await lieuLoader.recupereDesLieux(latitude, longitude, page)

  return { props: { lieux } }
}
