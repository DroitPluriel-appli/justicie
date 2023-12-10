import { Metadata } from 'next'
import { ReactElement } from 'react'

import PageRechercherUneAideJuridique from '../../components/PageRechercherUneAideJuridique/PageRechercherUneAideJuridique'
import { frontDependencies } from '../../configuration/frontDependencies'

const { wording } = frontDependencies
export const metadata: Metadata = {
  title: wording.TITLE_PAGE_RECHERCHER_UNE_AIDE_JURIDIQUE,
}

export default function Page(): ReactElement {
  return (
    <PageRechercherUneAideJuridique />
  )
}
