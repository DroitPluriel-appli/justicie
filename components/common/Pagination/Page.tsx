import Link from 'next/link'
import { ReactElement } from 'react'

import { useDependencies } from '../../../configuration/useDependencies'
import { usePagination } from './usePagination'

type PageProps = Readonly<{
  nombreDeResultat: number
}>

export default function Page({ nombreDeResultat }: PageProps): ReactElement {
  const { wording } = useDependencies()
  const { pageCourante, pages, url } = usePagination(nombreDeResultat)

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
                  href={url(page - 1)}
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
