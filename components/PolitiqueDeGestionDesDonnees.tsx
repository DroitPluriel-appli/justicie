import Head from 'next/head'
import { ReactElement } from 'react'

import { useDependencies } from '../configuration/useDependencies'

export default function PolitiqueDeGestionDesDonnees(): ReactElement {
  const { wording } = useDependencies()

  return (
    <>
      <Head>
        <title>
          {wording.TITLE_PAGE_POLITIQUE_DE_GESTION_DES_DONNEES}
        </title>
      </Head>
      {wording.TITLE_PAGE_POLITIQUE_DE_GESTION_DES_DONNEES}
    </>
  )
}
