import Head from 'next/head'
import { ReactElement } from 'react'

import { useDependencies } from '../../configuration/useDependencies'
import RetourHautDePage from '../RetourHautDePage/RetourHautDePage'
import CritereDAccessibilite from './CritereDAccessibilite'
import styles from './NosCriteresDAccessibilite.module.css'

export default function NosCriteresDAccessibilite(): ReactElement {
  const { criteres, wording } = useDependencies()

  return (
    <>
      <Head>
        <title>
          {wording.TITLE_PAGE_NOS_CRITERES_D_ACCESSIBILITE}
        </title>
      </Head>
      <h2 className={styles.title}>
        {wording.TITLE_PAGE_NOS_CRITERES_D_ACCESSIBILITE}
      </h2>
      {
        criteres.map((critere) => (
          <CritereDAccessibilite
            description={critere.description}
            imgSrc={critere.imgSrc}
            key={critere.title}
            title={critere.title}
          />
        ))
      }

      <RetourHautDePage />
    </>
  )
}
