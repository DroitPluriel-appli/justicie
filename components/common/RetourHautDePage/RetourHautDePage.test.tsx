import { screen } from '@testing-library/react'

import RetourHautDePage from './RetourHautDePage'
import { fakeFrontDependencies, renderFakeComponent } from '../../../configuration/testHelper'

describe('retour en haut de page', () => {
  const { wording } = fakeFrontDependencies

  it('affiche l’ancre pour revenir en haut de page', () => {
    // WHEN
    renderFakeComponent(<RetourHautDePage />)

    // THEN
    const retourHautDePage = screen.getByRole('link', { name: wording.RETOUR_EN_HAUT_DE_PAGE })
    expect(retourHautDePage).toHaveAttribute('href', '#evitement')
  })
})
