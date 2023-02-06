import { ReactElement } from 'react'

import { useDependencies } from '../configuration/useDependencies'
import Title from './common/Title/Title'

export default function PageMentionsLegales(): ReactElement {
  const { wording } = useDependencies()

  return (
    <>
      <Title>
        {wording.TITLE_PAGE_MENTIONS_LEGALES}
      </Title>
      {wording.MENTIONS_LEGALES}
    </>
  )
}
