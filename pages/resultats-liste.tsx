import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { ReactElement } from 'react'

import { backDependencies } from '../backend/backDependencies'
import { Lieu } from '../backend/entities/Lieu'
import ResultatsListe from '../components/Resultats/ResultatsListe'
import { criteres } from '../configuration/criteres'
import { WordingFr } from '../configuration/wording/WordingFr'

export default function PageAdressesListe({ lieux, nombreDeResultat }: { lieux: Lieu[], nombreDeResultat: number }): ReactElement {
  return (
    <ResultatsListe
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
  const { lieuLoader, nombreDeLieuxAffichesParPage } = backDependencies
  const latitude = Number(context.query.lat)
  const longitude = Number(context.query.lon)
  const page = context.query.page === undefined ? 0 : Number(context.query.page)

  const accessibilites = criteres(new WordingFr())
    .filter((critere) => context.query[critere.name])
    .map((critere) => critere.name)

  // @ts-ignore
  const { lieux, nombreDeResultat } = await lieuLoader.recupereDesLieux(latitude, longitude, page, nombreDeLieuxAffichesParPage, accessibilites)

  return { props: { lieux: JSON.parse(JSON.stringify(lieux)) as Lieu[], nombreDeResultat } }
}
