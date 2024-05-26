import { screen } from '@testing-library/react'

import Preformate from './Preformate'
import { renderFakeComponent } from '../../../configuration/testHelper'

describe('composant preformaté', () => {
  it('étant donné un enfant HTML vide quand j’affiche son préformatage alors rien ne s’affiche', () => {
    // GIVEN
    const elementVide = ''

    // WHEN
    renderFakeComponent(
      <Preformate>
        {elementVide}
      </Preformate>
    )

    // THEN
    const preformate = screen.queryByText(elementVide, { selector: 'pre' })
    expect(preformate).not.toBeInTheDocument()
  })
})
