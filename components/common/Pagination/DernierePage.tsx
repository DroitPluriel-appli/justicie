import Link from 'next/link'
import { ReactElement } from 'react'

import { pagination } from './pagination'
import { frontDependencies } from '../../../configuration/frontDependencies'
import { useDependencies } from '../../../configuration/useDependencies'
import { transformerIteratorEnObject } from '../query'

type DernierePageProps = Readonly<{
  nombreDeResultat: number
}>

export default function DernierePage({ nombreDeResultat }: DernierePageProps): ReactElement {
  const { useSearchParams } = useDependencies()
  const searchParams = useSearchParams()

  const { nombreDePage, pageCourante } = pagination(nombreDeResultat, frontDependencies.nombreDeLieuxAffichesParPage, searchParams.get('page'))
  const dernierePage = nombreDePage - 1
  const isDernierePage = dernierePage === pageCourante
  const params = transformerIteratorEnObject(searchParams.entries())

  return isDernierePage ? (
    <svg
      aria-hidden
      height="12"
      viewBox="0 0 8 12"
      width="8"
    >
      <path d="M5.0127 6.07329L0.147073 10.5899L1.52227 11.8637L7.85284 6L1.52227 0.136306L0.147073 1.41008L5.0127 5.92671L5.09166 6L5.0127 6.07329Z" />
    </svg>
  ) : (
    <Link href={{
      pathname: frontDependencies.paths.RESULTATS_LISTE,
      query: {
        ...params,
        page: dernierePage,
      },
    }}
    >
      <svg
        aria-label={frontDependencies.wording.DERNIERE_PAGE}
        height="12"
        role="img"
        viewBox="0 0 8 12"
        width="8"
      >
        <path d="M5.0127 6.07329L0.147073 10.5899L1.52227 11.8637L7.85284 6L1.52227 0.136306L0.147073 1.41008L5.0127 5.92671L5.09166 6L5.0127 6.07329Z" />
      </svg>
    </Link>
  )
}
