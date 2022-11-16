import Head from 'next/head'
import { ReactElement } from 'react'

import { useDependencies } from '../configuration/useDependencies'

export default function NosCriteresDAccessibilite(): ReactElement {
  const { wording } = useDependencies()

  return (
    <>
      <Head>
        <title>
          {wording.TITLE_PAGE_NOS_CRITERES_D_ACCESSIBILITE}
        </title>
      </Head>
      {wording.TITLE_PAGE_NOS_CRITERES_D_ACCESSIBILITE}
    </>
  )
}
