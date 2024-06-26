import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ReactElement } from 'react'

import { backDependencies } from '../../../backend/backDependencies'
import { Lieu } from '../../../backend/entities/Lieu'
import PageLieu from '../../../components/PageLieu/PageLieu'
import { frontDependencies } from '../../../configuration/frontDependencies'

type PageProps = Readonly<{
  params: Readonly<{ id: ReadonlyArray<string> }>
  searchParams: Readonly<Record<string, ReadonlyArray<string> | string | undefined>>
}>

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  return {
    title: frontDependencies.wording.TITLE_PAGE_LIEU((await recupereUnLieu(params, searchParams)).nom),
  }
}

export default async function Page({ params, searchParams }: PageProps): Promise<ReactElement> {
  return (
    <PageLieu lieu={await recupereUnLieu(params, searchParams)} />
  )
}

async function recupereUnLieu(params: PageProps['params'], searchParams: PageProps['searchParams']): Promise<Lieu> {
  if (!Number(searchParams.lat) || !Number(searchParams.lon)) {
    notFound()
  }

  const { lieuLoader } = backDependencies
  const latitude = Number(searchParams.lat)
  const longitude = Number(searchParams.lon)
  const id = Number(params.id[0])

  const lieux = await lieuLoader.recupereUnLieu(id, latitude, longitude)

  if (lieux.length === 0) {
    notFound()
  }

  return JSON.parse(JSON.stringify(lieux[0])) as Lieu
}
