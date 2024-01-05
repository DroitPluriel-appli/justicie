import { ReactElement } from 'react'

import DernierePage from './DernierePage'
import Page from './Page'
import styles from './Pagination.module.css'
import PremierePage from './PremierePage'
import { frontDependencies } from '../../../configuration/frontDependencies'

type PaginationProps = Readonly<{
  nombreDeResultat: number
}>

export default function Pagination({ nombreDeResultat }: PaginationProps): ReactElement {
  return (
    <nav aria-label={frontDependencies.wording.PAGINATION}>
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
