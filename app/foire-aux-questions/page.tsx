import { Metadata } from 'next'
import { ReactElement } from 'react'

import PageFoireAuxQuestions from '../../components/PageFoireAuxQuestions/PageFoireAuxQuestions'
import { frontDependencies } from '../../configuration/frontDependencies'

export const metadata: Metadata = {
  title: frontDependencies.wording.TITLE_PAGE_FOIRE_AUX_QUESTIONS,
}

export default function Page(): ReactElement {
  return (
    <PageFoireAuxQuestions />
  )
}
