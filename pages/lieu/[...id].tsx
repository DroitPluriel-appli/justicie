import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { ReactElement } from 'react'

import { backDependencies } from '../../backend/backDependencies'
import { Lieu as LieuEntity } from '../../backend/entities/Lieu'
import Lieu from '../../components/Lieu/Lieu'

export default function PageLieu({ lieu }: { lieu: LieuEntity }): ReactElement {
  return (
    <Lieu lieu={lieu} />
  )
}

type ServerSidePropsResult = Readonly<{
  lieu: LieuEntity
}>

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<ServerSidePropsResult>> {
  const { lieuLoader } = backDependencies
  const latitude = context.query.lat ? Number(context.query.lat) : 0
  const longitude = context.query.lon ? Number(context.query.lon) : 0
  const id = Number(context.query.id)

  const lieux = await lieuLoader.recupereUnLieu(id, latitude, longitude)

  if (lieux.length === 0) {
    return { notFound: true }
  }

  return { props: { lieu: JSON.parse(JSON.stringify(lieux[0])) as LieuEntity } }
}
