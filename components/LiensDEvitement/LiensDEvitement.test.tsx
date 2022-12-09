import { screen, within } from '@testing-library/react'

import { fakeFrontDependencies, renderFakeComponent } from '../../configuration/testHelper'
import LiensDEvitement from './LiensDEvitement'

describe('liens d’évitement', () => {
  const { wording } = fakeFrontDependencies

  it('affiche des liens pour naviguer à travers la page', () => {
    // WHEN
    renderFakeComponent(<LiensDEvitement />)

    // THEN
    const evitementContainer = screen.getByRole('navigation')
    expect(evitementContainer).toHaveAttribute('aria-label', wording.ACCES_RAPIDE)
    expect(evitementContainer).toHaveAttribute('id', 'evitement')

    const list = within(evitementContainer).getByRole('list')
    const listItem = within(list).getByRole('listitem')
    const liensDEvitement = within(listItem).getByRole('link', { name: wording.EVITEMENT_ALLER_AU_CONTENU })
    expect(liensDEvitement).toHaveAttribute('href', '#contenu')
  })
})
