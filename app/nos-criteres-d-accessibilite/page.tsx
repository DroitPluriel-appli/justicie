import { Metadata } from 'next'
import { ReactElement } from 'react'

import PageNosCriteresDAccessibilite from '../../components/PageNosCriteresDAccessibilite/PageNosCriteresDAccessibilite'
import { frontDependencies } from '../../configuration/frontDependencies'

export const metadata: Metadata = {
  title: frontDependencies.wording.TITLE_PAGE_NOS_CRITERES_D_ACCESSIBILITE,
}

export default function Page(): ReactElement {
  return (
    <PageNosCriteresDAccessibilite />
  )
}
