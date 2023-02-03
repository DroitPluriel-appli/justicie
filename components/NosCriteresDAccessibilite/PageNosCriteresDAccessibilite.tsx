import { ReactElement } from 'react'

import { useDependencies } from '../../configuration/useDependencies'
import RetourHautDePage from '../RetourHautDePage/RetourHautDePage'
import Title from '../Title/Title'
import CritereDAccessibilite from './CritereDAccessibilite'
import styles from './NosCriteresDAccessibilite.module.css'

export default function PageNosCriteresDAccessibilite(): ReactElement {
  const { criteres, wording } = useDependencies()

  return (
    <>
      <Title>
        {wording.TITLE_PAGE_NOS_CRITERES_D_ACCESSIBILITE}
      </Title>
      <h2 className={styles.title}>
        {wording.NOS_CRITERES_D_ACCESSIBILITE}
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
