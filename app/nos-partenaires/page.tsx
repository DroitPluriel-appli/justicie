import { Metadata } from 'next'
import { ReactElement } from 'react'

import PageNosPartenaires from '../../components/PageNosPartenaires/PageNosPartenaires'
import { frontDependencies } from '../../configuration/frontDependencies'

export const metadata: Metadata = {
  title: frontDependencies.wording.TITLE_PAGE_NOS_PARTENAIRES,
}

export default function Page(): ReactElement {
  return (
    <PageNosPartenaires />
  )
}
