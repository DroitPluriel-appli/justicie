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
  // A cause du fait d'un rafraichissement vidant le cache du navigateur
  if ((context.query.id as string[])[0] === 'favicon.png') {
    return { notFound: true }
  }

  if (!Number(context.query.lat) || !Number(context.query.lon)) {
    return { notFound: true }
  }

  const { lieuLoader } = backDependencies
  const latitude = Number(context.query.lat)
  const longitude = Number(context.query.lon)
  const id = Number((context.query.id as string[])[0])

  const lieux = await lieuLoader.recupereUnLieu(id, latitude, longitude)

  if (lieux.length === 0) {
    return { notFound: true }
  }

  return { props: { lieu: JSON.parse(JSON.stringify(lieux[0])) as LieuEntity } }
}
