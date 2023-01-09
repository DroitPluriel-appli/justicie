import { fireEvent, screen } from '@testing-library/react'

import { renderFakeComponent } from '../../configuration/testHelper'
import { BoutonModeSombre } from './BoutonModeSombre'

describe('bouton mode sombre', () => {

  it('toggle le mode sombre au clic sur le bouton mode Sombre', () => {
    // GIVEN
    renderFakeComponent(<BoutonModeSombre />)
    const boutonModeSombre = screen.getByTitle('modeSombre')
    const setItem = jest.spyOn(Storage.prototype, 'setItem')
    const removeItem = jest.spyOn(Storage.prototype, 'removeItem')

    // WHEN
    fireEvent.click(boutonModeSombre)

    // THEN
    expect(document.body.dataset.modeSombre).toBe('true')
    expect(setItem).toHaveBeenCalledWith('modeSombreEnabled', 'true')

    // WHEN
    fireEvent.click(boutonModeSombre)

    // THEN
    expect(document.body.dataset.modeSombre).toBeUndefined()
    expect(removeItem).toHaveBeenCalledWith('modeSombreEnabled')
  })
})
