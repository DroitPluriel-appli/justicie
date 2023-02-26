import { fireEvent, screen } from '@testing-library/react'

import { BoutonModeSombre } from './BoutonModeSombre'
import { fakeFrontDependencies, renderFakeComponent } from '../../../configuration/testHelper'

describe('bouton mode sombre', () => {
  const { wording } = fakeFrontDependencies

  it('toggle le mode sombre au clic sur le bouton mode Sombre', () => {
    // GIVEN
    renderFakeComponent(<BoutonModeSombre />)
    const boutonModeSombre = screen.getByRole('button', { name: wording.MODE_SOMBRE })
    const setItem = jest.spyOn(Storage.prototype, 'setItem')
    const removeItem = jest.spyOn(Storage.prototype, 'removeItem')

    // WHEN
    fireEvent.click(boutonModeSombre)

    // THEN
    expect(document.body).toHaveClass('themeDark')
    expect(setItem).toHaveBeenCalledWith('themeDark', 'true')

    // WHEN
    fireEvent.click(boutonModeSombre)

    // THEN
    expect(document.body).toHaveClass('themeLight')
    expect(removeItem).toHaveBeenCalledWith('themeDark')
  })
})
