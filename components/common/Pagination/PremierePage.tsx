import Link from 'next/link'
import { ReactElement } from 'react'

import { useDependencies } from '../../../configuration/useDependencies'
import { usePagination } from './usePagination'

export default function PremierePage(): ReactElement {
  const { wording } = useDependencies()
  const { pageCourante, url } = usePagination()

  const isPremierePage = pageCourante === 0

  return isPremierePage ? (
    <svg
      aria-hidden
      height="12"
      viewBox="0 0 8 12"
      width="8"
    >
      <path
        d="M2.9873 6.07329L7.85293 10.5899L6.47773 11.8637L0.147159 6L6.47773 0.136306L7.85293 1.41008L2.9873 5.92671L2.90834 6L2.9873 6.07329Z"
      />
    </svg>
  ) : (
    <Link href={url(0)}>
      <svg
        height="12"
        viewBox="0 0 8 12"
        width="8"
      >
        <title>
          {wording.PREMIERE_PAGE}
        </title>
        <path d="M2.9873 6.07329L7.85293 10.5899L6.47773 11.8637L0.147159 6L6.47773 0.136306L7.85293 1.41008L2.9873 5.92671L2.90834 6L2.9873 6.07329Z" />
      </svg>
    </Link>
  )
}
