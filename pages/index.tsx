import { ReactElement } from 'react'

import Accueil from '../components/Accueil/Accueil'
import RetourHautDePage from '../components/RetourHautDePage/RetourHautDePage'

export default function PageAccueil(): ReactElement {
  return (
    <>
      <Accueil />
      <RetourHautDePage />
    </>
  )
}
