import { GetServerSidePropsContext } from 'next'
import { ReactElement } from 'react'

import RechercherParHandicap from '../components/RechercherParHandicap/RechercherParHandicap'

export default function Router(): ReactElement {
  return (
    <RechercherParHandicap />
  )
}

export function getServerSideProps(context: GetServerSidePropsContext) {
  if (!Number(context.query.lat) || !Number(context.query.lon)) {
    return { notFound: true }
  }

  return { props: {} }
}
