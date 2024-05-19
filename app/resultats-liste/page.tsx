import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ReactElement } from 'react'

import { backDependencies } from '../../backend/backDependencies'
import { Critere } from '../../backend/entities/Critere'
import { Lieu } from '../../backend/entities/Lieu'
import PageResultatsListe from '../../components/PageResultats/PageResultatsListe'
import { criteres } from '../../configuration/criteres'
import { frontDependencies } from '../../configuration/frontDependencies'
import { WordingFr } from '../../configuration/WordingFr'

export const metadata: Metadata = {
  title: frontDependencies.wording.TITLE_PAGE_ADRESSE_LISTE,
}

type PageProps = Readonly<{
  searchParams: Readonly<Record<string, ReadonlyArray<string> | string | undefined>>
}>

export default async function Page({ searchParams }: PageProps): Promise<ReactElement> {
  if (!Number(searchParams.lat) || !Number(searchParams.lon)) {
    notFound()
  }

  const { lieuLoader, nombreDeLieuxAffichesParPage } = backDependencies
  const latitude = Number(searchParams.lat)
  const longitude = Number(searchParams.lon)
  const page = searchParams.page === undefined ? 0 : Number(searchParams.page)

  const criteresDAccessibiliteSelectionnes = criteres(new WordingFr())
    .filter((critere): boolean => searchParams[critere.name] !== undefined)
    .map((critere): Critere => critere.name)

  const { lieux, nombreDeResultat } = await lieuLoader.recupereDesLieux(
    latitude,
    longitude,
    new Set(criteresDAccessibiliteSelectionnes),
    page,
    nombreDeLieuxAffichesParPage
  )

  return (
    <PageResultatsListe
      criteresDAccessibiliteSelectionnes={criteresDAccessibiliteSelectionnes}
      lieux={JSON.parse(JSON.stringify(lieux)) as ReadonlyArray<Lieu>}
      nombreDeResultat={nombreDeResultat}
    />
  )
}
