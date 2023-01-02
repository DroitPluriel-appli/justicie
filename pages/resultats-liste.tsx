import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { ReactElement } from 'react'

import { Lieu } from '../backend/entities/Lieu'
import { recupereDesLieux } from '../backend/infrastructure/gateways/lieuxRepository'
import ResultatsListe from '../components/Resultats/ResultatsListe'
import dataSource from '../database/dataSource'

export default function PageAdressesListe({ lieux }: { lieux: Lieu[] }): ReactElement {
  return (
    <ResultatsListe lieux={lieux} />
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
