import { Metadata } from 'next'
import { ReactElement } from 'react'

import PageFoireAuxQuestions from '../../components/PageFoireAuxQuestions/PageFoireAuxQuestions'
import { frontDependencies } from '../../configuration/frontDependencies'

const { wording } = frontDependencies
export const metadata: Metadata = {
  title: wording.TITLE_PAGE_FOIRE_AUX_QUESTIONS,
}

export default function Page(): ReactElement {
  return (
    <PageFoireAuxQuestions />
  )
}
