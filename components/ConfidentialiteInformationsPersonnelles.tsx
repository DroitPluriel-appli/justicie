import Head from 'next/head'
import { ReactElement } from 'react'

import { useDependencies } from '../configuration/useDependencies'

export default function ConfidentialiteInformationsPersonnelles(): ReactElement {
  const { wording } = useDependencies()

  return (
    <>
      <Head>
        <title>
          {wording.TITLE_PAGE_CONFIDENTIALITE_INFORMATIONS_PERSONNELLES}
        </title>
      </Head>
      {wording.TITLE_PAGE_CONFIDENTIALITE_INFORMATIONS_PERSONNELLES}
    </>
  )
}
