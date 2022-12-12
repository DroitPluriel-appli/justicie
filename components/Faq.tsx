import Head from 'next/head'
import { ReactElement } from 'react'

import { useDependencies } from '../configuration/useDependencies'

export default function Faq(): ReactElement {
  const { wording } = useDependencies()

  return (
    <>
      <Head>
        <title>
          {wording.TITLE_FAQ}
        </title>
      </Head>
      {wording.TITLE_FAQ}
    </>
  )
}
