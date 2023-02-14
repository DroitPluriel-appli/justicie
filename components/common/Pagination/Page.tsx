import Link from 'next/link'
import { ReactElement } from 'react'

import { useDependencies } from '../../../configuration/useDependencies'
import { pagination, urlDePagination } from './pagination'

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
                  href={urlDePagination(page - 1, paths, query)}
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
