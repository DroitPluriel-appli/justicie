import { ReactElement } from 'react'

import { recupereDesLieux } from '../backend/repository/lieuxRepository'
import ResultatsListe from '../components/Resultats/ResultatsListe'
import { LieuModel } from '../database/models/EntitéJuridiqueModel'

export default function PageAdressesListe({ lieux }: { lieux: LieuModel[] }): ReactElement {
  return (
    <ResultatsListe lieux={lieux} />
  )
}

export async function getServerSideProps() {
  const lieux = await recupereDesLieux()

  return { props: { lieux } }
}
