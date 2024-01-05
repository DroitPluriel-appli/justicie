import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ReactElement } from 'react'

import { backDependencies } from '../../backend/backDependencies'
import { Critere } from '../../backend/entities/Critere'
import { Lieu } from '../../backend/entities/Lieu'
import PageResultatsPlan from '../../components/PageResultats/PageResultatsPlan'
import { criteres } from '../../configuration/criteres'
import { frontDependencies } from '../../configuration/frontDependencies'
import { WordingFr } from '../../configuration/wording/WordingFr'

export const metadata: Metadata = {
  title: frontDependencies.wording.TITLE_PAGE_RESULTATS_PAR_PLAN,
}

type PageProps = Readonly<{
  searchParams: Readonly<{ [key: string]: string | string[] | undefined }>
}>

export default async function Page({ searchParams }: PageProps): Promise<ReactElement> {
  if (!Number(searchParams.lat) || !Number(searchParams.lon)) {
    notFound()
  }

  const { lieuLoader, rayonDeRecherche } = backDependencies
  const latitude = Number(searchParams.lat)
  const longitude = Number(searchParams.lon)
  const page = 0
  const nombreDeLieuxAffichesParPage = 10_000

  const criteresDAccessibiliteSelectionnes = criteres(new WordingFr())
    .filter((critere): boolean => searchParams[critere.name] !== undefined)
    .map((critere): Critere => critere.name)

  const { lieux, nombreDeResultat } = await lieuLoader.recupereDesLieux(
    latitude,
    longitude,
    new Set(criteresDAccessibiliteSelectionnes),
    page,
    nombreDeLieuxAffichesParPage,
    rayonDeRecherche
  )

  return (
    <PageResultatsPlan
      criteresDAccessibiliteSelectionnes={criteresDAccessibiliteSelectionnes}
      lieux={JSON.parse(JSON.stringify(lieux)) as Lieu[]}
      nombreDeResultat={nombreDeResultat}
    />
  )
}
