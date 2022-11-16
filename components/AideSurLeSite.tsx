import Head from 'next/head'
import { ReactElement } from 'react'

import { useDependencies } from '../configuration/useDependencies'

export default function AideSurLeSite(): ReactElement {
  const { wording } = useDependencies()

  return (
    <>
      <Head>
        <title>
          {wording.TITLE_PAGE_AIDE_SUR_LE_SITE}
        </title>
      </Head>
      {wording.TITLE_PAGE_AIDE_SUR_LE_SITE}
    </>
  )
}
