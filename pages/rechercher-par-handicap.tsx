import { GetServerSidePropsContext } from 'next'
import { ReactElement } from 'react'

import PageRechercherParHandicap from '../components/PageRechercherParHandicap/PageRechercherParHandicap'

export default function Router(): ReactElement {
  return (
    <PageRechercherParHandicap />
  )
}

export function getServerSideProps(context: GetServerSidePropsContext) {
  if (!Number(context.query.lat) || !Number(context.query.lon)) {
    return { notFound: true }
  }

  return { props: {} }
}
