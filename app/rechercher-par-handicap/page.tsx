import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ReactElement } from 'react'

import PageRechercherParHandicap from '../../components/PageRechercherParHandicap/PageRechercherParHandicap'
import { frontDependencies } from '../../configuration/frontDependencies'

export const metadata: Metadata = {
  title: frontDependencies.wording.TITLE_PAGE_RECHERCHER_PAR_HANDICAP,
}

type PageProps = Readonly<{
  searchParams: Readonly<{ [key: string]: string | string[] | undefined }>
}>

export default function Page({ searchParams }: PageProps): ReactElement {
  if (!Number(searchParams.lat) || !Number(searchParams.lon)) {
    notFound()
  }

  return (
    <PageRechercherParHandicap />
  )
}
