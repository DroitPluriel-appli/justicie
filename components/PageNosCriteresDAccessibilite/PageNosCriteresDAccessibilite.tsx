'use client'

import { ReactElement } from 'react'

import CritereDAccessibilite from './CritereDAccessibilite/CritereDAccessibilite'
import { useDependencies } from '../../configuration/useDependencies'
import RetourHautDePage from '../common/RetourHautDePage/RetourHautDePage'

export default function PageNosCriteresDAccessibilite(): ReactElement {
  const { criteres, wording } = useDependencies()

  return (
    <>
      <h1 className="titre1">
        {wording.NOS_CRITERES_D_ACCESSIBILITE}
      </h1>
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
