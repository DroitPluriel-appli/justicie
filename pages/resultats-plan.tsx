import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { ReactElement } from 'react'

import { backDependencies } from '../backend/backDependencies'
import { Critere } from '../backend/entities/Critere'
import { Lieu } from '../backend/entities/Lieu'
import PageResultatsPlan from '../components/PageResultats/PageResultatsPlan'
import { criteres } from '../configuration/criteres'
import { WordingFr } from '../configuration/wording/WordingFr'

export default function Router({ lieux, nombreDeResultat }: { lieux: Lieu[], nombreDeResultat: number }): ReactElement {
  return (
    <PageResultatsPlan
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

  const { lieuLoader, rayonDeRecherche } = backDependencies
  const latitude = Number(context.query.lat)
  const longitude = Number(context.query.lon)
  const page = 0
  const nombreDeLieuxAffichesParPage = 10_000

  const accessibilites = criteres(new WordingFr())
    .filter((critere): boolean => context.query[critere.name] !== undefined)
    .map((critere): Critere => critere.name)

  const { lieux, nombreDeResultat } = await lieuLoader.recupereDesLieux(
    latitude,
    longitude,
    new Set(accessibilites),
    page,
    nombreDeLieuxAffichesParPage,
    rayonDeRecherche
  )

  return { props: { lieux: JSON.parse(JSON.stringify(lieux)) as Lieu[], nombreDeResultat } }
}
