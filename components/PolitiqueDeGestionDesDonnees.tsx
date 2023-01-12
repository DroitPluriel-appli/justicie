import { ReactElement } from 'react'

import { useDependencies } from '../configuration/useDependencies'
import Title from './Title/Title'

export default function PolitiqueDeGestionDesDonnees(): ReactElement {
  const { wording } = useDependencies()

  return (
    <>
      <Title>
        {wording.TITLE_PAGE_POLITIQUE_DE_GESTION_DES_DONNEES}
      </Title>
      {wording.POLITIQUE_DE_GESTION_DES_DONNEES}
    </>
  )
}
