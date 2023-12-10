import { Metadata } from 'next'
import { ReactElement } from 'react'

import PageNosCriteresDAccessibilite from '../../components/PageNosCriteresDAccessibilite/PageNosCriteresDAccessibilite'
import { frontDependencies } from '../../configuration/frontDependencies'

const { wording } = frontDependencies
export const metadata: Metadata = {
  title: wording.TITLE_PAGE_NOS_CRITERES_D_ACCESSIBILITE,
}

export default function Page(): ReactElement {
  return (
    <PageNosCriteresDAccessibilite />
  )
}
