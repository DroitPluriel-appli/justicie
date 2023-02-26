import { ReactElement } from 'react'

import DernierePage from './DernierePage'
import Page from './Page'
import styles from './Pagination.module.css'
import PremierePage from './PremierePage'
import { useDependencies } from '../../../configuration/useDependencies'

type PaginationProps = Readonly<{
  nombreDeResultat: number
}>

export default function Pagination({ nombreDeResultat }: PaginationProps): ReactElement {
  const { wording } = useDependencies()

  return (
    <nav aria-label={wording.PAGINATION}>
      <ol className={styles.pagination}>
        <li>
          <PremierePage />
        </li>
        <Page nombreDeResultat={nombreDeResultat} />
        <li>
          <DernierePage nombreDeResultat={nombreDeResultat} />
        </li>
      </ol>
    </nav>
  )
}
