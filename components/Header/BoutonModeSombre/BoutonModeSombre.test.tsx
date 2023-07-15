import { fireEvent, screen } from '@testing-library/react'

import { BoutonModeSombre } from './BoutonModeSombre'
import { fakeFrontDependencies, renderFakeComponent } from '../../../configuration/testHelper'

describe('bouton mode sombre', () => {
  const { wording } = fakeFrontDependencies

  it('toggle le mode sombre au clic sur le bouton mode Sombre', () => {
    // GIVEN
    const setItem = vi.spyOn(Storage.prototype, 'setItem')
    const removeItem = vi.spyOn(Storage.prototype, 'removeItem')
    renderFakeComponent(<BoutonModeSombre />)

    // WHEN
    afficheLeThemeSombre(wording.MODE_SOMBRE)

    // THEN
    expect(document.body).toHaveClass('themeDark')
    expect(setItem).toHaveBeenCalledWith('themeDark', 'true')

    // WHEN
    afficheLeThemeClair(wording.MODE_SOMBRE)

    // THEN
    expect(document.body).toHaveClass('themeLight')
    expect(removeItem).toHaveBeenCalledWith('themeDark')
  })
})

function afficheLeThemeSombre(label: string) {
  afficheUnTheme(label)
}

function afficheLeThemeClair(label: string) {
  afficheUnTheme(label)
}

function afficheUnTheme(label: string) {
  fireEvent.click(screen.getByRole('button', { name: label }))
}
