import Head from 'next/head'
import { ReactElement } from 'react'

import { useDependencies } from '../configuration/useDependencies'

export default function FoireAuxQuestions(): ReactElement {
  const { wording } = useDependencies()

  return (
    <>
      <Head>
        <title>
          {wording.TITLE_FOIRE_AUX_QUESTIONS}
        </title>
      </Head>
      {wording.TITLE_FOIRE_AUX_QUESTIONS}
    </>
  )
}
