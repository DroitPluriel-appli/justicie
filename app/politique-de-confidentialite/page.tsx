import { Metadata } from 'next'
import { ReactElement } from 'react'

import PagePolitiqueDeConfidentialite from '../../components/PagePolitiqueDeConfidentialite/PagePolitiqueDeConfidentialite'
import { frontDependencies } from '../../configuration/frontDependencies'

export const metadata: Metadata = {
  title: frontDependencies.wording.TITLE_PAGE_POLITIQUE_DE_CONFIDENTIALITE,
}

export default function Page(): ReactElement {
  return (
    <PagePolitiqueDeConfidentialite />
  )
}
