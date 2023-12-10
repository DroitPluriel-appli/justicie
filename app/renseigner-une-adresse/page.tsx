import { Metadata } from 'next'
import { ReactElement } from 'react'

import PageRenseignerUneAdresse from '../../components/PageRenseignerUneAdresse/PageRenseignerUneAdresse'
import { frontDependencies } from '../../configuration/frontDependencies'

const { wording } = frontDependencies
export const metadata: Metadata = {
  title: wording.TITLE_PAGE_RENSEIGNER_UNE_ADRESSE,
}

export default function Page(): ReactElement {
  return (
    <PageRenseignerUneAdresse />
  )
}
