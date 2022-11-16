import Head from 'next/head'
import { ReactElement } from 'react'

import { useDependencies } from '../configuration/useDependencies'

export default function MentionsLegales(): ReactElement {
  const { wording } = useDependencies()

  return (
    <>
      <Head>
        <title>
          {wording.TITLE_PAGE_MENTIONS_LEGALES}
        </title>
      </Head>
      {wording.TITLE_PAGE_MENTIONS_LEGALES}
    </>
  )
}
