import { Metadata } from 'next'
import { ReactElement } from 'react'

import PageAccueil from '../components/PageAccueil/PageAccueil'
import { frontDependencies } from '../configuration/frontDependencies'

const { wording } = frontDependencies
export const metadata: Metadata = {
  title: wording.TITLE_PAGE_ACCUEIL,
}

export default function Page(): ReactElement {
  return (
    <PageAccueil />
  )
}
