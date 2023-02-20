import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { ReactElement } from 'react'

import { backDependencies } from '../backend/backDependencies'
import { Critere } from '../backend/entities/Critere'
import { Lieu } from '../backend/entities/Lieu'
import PageResultatsListe from '../components/PageResultats/PageResultatsListe'
import { criteres } from '../configuration/criteres'
import { WordingFr } from '../configuration/wording/WordingFr'

export type ResultatsListeProps = Readonly<{
  criteresDAccessibiliteSelectionnes: Critere[]
  lieux: Lieu[]
  nombreDeResultat: number
}>

export default function Router({ criteresDAccessibiliteSelectionnes, lieux, nombreDeResultat }: ResultatsListeProps): ReactElement {
  return (
    <PageResultatsListe
      criteresDAccessibiliteSelectionnes={criteresDAccessibiliteSelectionnes}
      lieux={lieux}
      nombreDeResultat={nombreDeResultat}
    />
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<ResultatsListeProps>> {
  if (!Number(context.query.lat) || !Number(context.query.lon)) {
    return { notFound: true }
  }

  const { lieuLoader, nombreDeLieuxAffichesParPage } = backDependencies
  const latitude = Number(context.query.lat)
  const longitude = Number(context.query.lon)
  const page = context.query.page === undefined ? 0 : Number(context.query.page)

  const criteresDAccessibiliteSelectionnes = criteres(new WordingFr())
    .filter((critere): boolean => context.query[critere.name] !== undefined)
    .map((critere): Critere => critere.name)

  const { lieux, nombreDeResultat } = await lieuLoader.recupereDesLieux(
    latitude,
    longitude,
    new Set(criteresDAccessibiliteSelectionnes),
    page,
    nombreDeLieuxAffichesParPage
  )

  return { props: { criteresDAccessibiliteSelectionnes, lieux: JSON.parse(JSON.stringify(lieux)) as Lieu[], nombreDeResultat } }
}
