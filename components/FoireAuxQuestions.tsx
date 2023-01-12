import { ReactElement } from 'react'

import { useDependencies } from '../configuration/useDependencies'
import Title from './Title/Title'

export default function FoireAuxQuestions(): ReactElement {
  const { wording } = useDependencies()

  return (
    <>
      <Title>
        {wording.TITLE_FOIRE_AUX_QUESTIONS}
      </Title>
      {wording.FOIRE_AUX_QUESTIONS}
    </>
  )
}
