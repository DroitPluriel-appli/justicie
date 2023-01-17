import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { ReactElement } from 'react'

import { backDependencies } from '../backend/backDependencies'
import { Critere } from '../backend/entities/Critere'
import { Lieu } from '../backend/entities/Lieu'
import ResultatsPlan from '../components/Resultats/ResultatsPlan'
import { criteres } from '../configuration/criteres'
import { WordingFr } from '../configuration/wording/WordingFr'

export default function PageResultatsParPlan({ lieux, nombreDeResultat }: { lieux: Lieu[], nombreDeResultat: number }): ReactElement {
  return (
    <ResultatsPlan
      lieux={lieux}
      nombreDeResultat={nombreDeResultat}
    />
  )
}

type ServerSidePropsResult = Readonly<{
  lieux: Lieu[]
  nombreDeResultat: number
}>

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<ServerSidePropsResult>> {
  if (!Number(context.query.lat) || !Number(context.query.lon)) {
    return { notFound: true }
  }

  const { lieuLoader, nombreDeLieuxAffichesParPage, rayonDeRecherche } = backDependencies
  const latitude = Number(context.query.lat)
  const longitude = Number(context.query.lon)
  const page = context.query.page === undefined ? 0 : Number(context.query.page)

  const accessibilites = criteres(new WordingFr())
    .filter((critere): boolean => context.query[critere.name] !== undefined)
    .map((critere): Critere => critere.name)

  const { lieux, nombreDeResultat } = await lieuLoader.recupereDesLieux(
    latitude,
    longitude,
    rayonDeRecherche,
    page,
    nombreDeLieuxAffichesParPage,
    new Set(accessibilites)
  )

  return { props: { lieux: JSON.parse(JSON.stringify(lieux)) as Lieu[], nombreDeResultat } }
}
