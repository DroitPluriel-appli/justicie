import { Metadata } from 'next'
import { ReactElement } from 'react'

import PageNosPartenaires from '../../components/PageNosPartenaires/PageNosPartenaires'
import { frontDependencies } from '../../configuration/frontDependencies'

const { wording } = frontDependencies
export const metadata: Metadata = {
  title: wording.TITLE_PAGE_NOS_PARTENAIRES,
}

export default function Page(): ReactElement {
  return (
    <PageNosPartenaires />
  )
}
