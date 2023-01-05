import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { ReactElement } from 'react'

import { backDependencies } from '../../backend/backDependencies'
import { Lieu as LieuEntity } from '../../backend/entities/Lieu'
import Lieu from '../../components/Lieu/Lieu'
import { LieuViewModel } from '../../components/Lieu/LieuViewModel'
import { frontDependencies } from '../../configuration/frontDependencies'

export default function PageLieu({ lieu }: { lieu: LieuEntity }): ReactElement {
  const { criteres, paths, wording } = frontDependencies
  const lieuViewModel = new LieuViewModel(criteres, lieu, paths, wording)

  return (
    <Lieu lieuViewModel={lieuViewModel} />
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

  const { lieuLoader } = backDependencies
  const latitude = context.query.lat ? Number(context.query.lat) : 0
  const longitude = context.query.lon ? Number(context.query.lon) : 0
  const id = Number((context.query.id as string[])[0])

  const lieux = await lieuLoader.recupereUnLieu(id, latitude, longitude)

  if (lieux.length === 0) {
    return { notFound: true }
  }

  return { props: { lieu: JSON.parse(JSON.stringify(lieux[0])) as LieuEntity } }
}
