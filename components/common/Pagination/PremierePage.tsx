import Link from 'next/link'
import { ReactElement } from 'react'

import { pagination } from './pagination'
import { frontDependencies } from '../../../configuration/frontDependencies'
import { useDependencies } from '../../../configuration/useDependencies'
import { transformerIteratorEnObject } from '../query'

export default function PremierePage(): ReactElement {
  const { useSearchParams } = useDependencies()
  const searchParams = useSearchParams()

  const nombreDeResultat = 0
  const { pageCourante } = pagination(nombreDeResultat, frontDependencies.nombreDeLieuxAffichesParPage, searchParams.get('page'))
  const isPremierePage = pageCourante === 0
  const params = transformerIteratorEnObject(searchParams.entries())

  return isPremierePage ? (
    <svg
      aria-hidden
      height="12"
      viewBox="0 0 8 12"
      width="8"
    >
      <path d="M2.9873 6.07329L7.85293 10.5899L6.47773 11.8637L0.147159 6L6.47773 0.136306L7.85293 1.41008L2.9873 5.92671L2.90834 6L2.9873 6.07329Z" />
    </svg>
  ) : (
    <Link href={{
      pathname: frontDependencies.paths.RESULTATS_LISTE,
      query: {
        ...params,
        page: 0,
      },
    }}
    >
      <svg
        aria-label={frontDependencies.wording.PREMIERE_PAGE}
        height="12"
        role="img"
        viewBox="0 0 8 12"
        width="8"
      >
        <path d="M2.9873 6.07329L7.85293 10.5899L6.47773 11.8637L0.147159 6L6.47773 0.136306L7.85293 1.41008L2.9873 5.92671L2.90834 6L2.9873 6.07329Z" />
      </svg>
    </Link>
  )
}
