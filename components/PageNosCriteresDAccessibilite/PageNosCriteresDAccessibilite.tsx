import { ReactElement } from 'react'

import CritereDAccessibilite from './CritereDAccessibilite/CritereDAccessibilite'
import { frontDependencies } from '../../configuration/frontDependencies'
import RetourHautDePage from '../common/RetourHautDePage/RetourHautDePage'

export default function PageNosCriteresDAccessibilite(): ReactElement {
  return (
    <>
      <h1 className="titre1">
        {frontDependencies.wording.NOS_CRITERES_D_ACCESSIBILITE}
      </h1>
      {
        frontDependencies.criteres.map((critere) => (
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
