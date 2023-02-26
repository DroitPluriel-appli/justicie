import Link from 'next/link'
import { ReactElement } from 'react'

import { pagination } from './pagination'
import { useDependencies } from '../../../configuration/useDependencies'

type PageProps = Readonly<{
  nombreDeResultat: number
}>

export default function Page({ nombreDeResultat }: PageProps): ReactElement {
  const { nombreDeLieuxAffichesParPage, paths, useRouter, wording } = useDependencies()
  const { query } = useRouter()
  const { pageCourante, pages } = pagination(nombreDeResultat, nombreDeLieuxAffichesParPage, query)

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
                    pathname: paths.RESULTATS_LISTE,
                    query: {
                      ...query,
                      page: page - 1,
                    },
                  }}
                  title={wording.PAGE(page)}
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
