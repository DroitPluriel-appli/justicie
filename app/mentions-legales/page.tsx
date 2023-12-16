import { Metadata } from 'next'
import { ReactElement } from 'react'

import PageMentionsLegales from '../../components/PageMentionsLegales/PageMentionsLegales'
import { frontDependencies } from '../../configuration/frontDependencies'

export const metadata: Metadata = {
  title: frontDependencies.wording.TITLE_PAGE_MENTIONS_LEGALES,
}

export default function Page(): ReactElement {
  return (
    <PageMentionsLegales />
  )
}
