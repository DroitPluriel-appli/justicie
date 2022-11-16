import { screen, within } from '@testing-library/react'

import { fakeFrontDependencies, renderFakeComponent } from '../../configuration/testHelper'
import Accueil from './Accueil'

describe('page d’accueil', () => {
  const { wording } = fakeFrontDependencies

  it('affiche le titre de l’onglet', () => {
    // WHEN
    renderFakeComponent(<Accueil />)

    // THEN
    expect(document.title).toBe(wording.JUSTICE_PLURIELLE)
  })

  it('affiche le contenu', () => {
    // WHEN
    renderFakeComponent(<Accueil />)

    // THEN
    const main = screen.getByRole('main')
    const title = within(main).getByRole('heading', { level: 2, name: wording.QU_EST_CE_JUSTICE_PLURIELLE })
    expect(title).toBeInTheDocument()
  })
})
