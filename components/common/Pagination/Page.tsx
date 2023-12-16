import Link from 'next/link'
import { ReactElement } from 'react'

import { pagination } from './pagination'
import { frontDependencies } from '../../../configuration/frontDependencies'
import { useDependencies } from '../../../configuration/useDependencies'
import { transformerIteratorEnObject } from '../query'

type PageProps = Readonly<{
  nombreDeResultat: number
}>

export default function Page({ nombreDeResultat }: PageProps): ReactElement {
  const { useSearchParams } = useDependencies()
  const searchParams = useSearchParams()

  const { pageCourante, pages } = pagination(nombreDeResultat, frontDependencies.nombreDeLieuxAffichesParPage, searchParams.get('page'))
  const params = transformerIteratorEnObject(searchParams.entries())

  return (
    <>
      {
        pages.map((page) => {
          if (pageCourante === page - 1) {
            return (
              <li
                aria-current="page"
                key={page}
              >
                {page}
              </li>
            )
          } else {
            return (
              <li key={page}>
                <Link
                  href={{
                    pathname: frontDependencies.paths.RESULTATS_LISTE,
                    query: {
                      ...params,
                      page: page - 1,
                    },
                  }}
                  title={frontDependencies.wording.PAGE(page)}
                >
                  {page}
                </Link>
              </li>
            )
          }
        })
      }
    </>
  )
}
