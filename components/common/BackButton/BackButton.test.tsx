import { fireEvent, screen } from '@testing-library/react'
import * as navigation from 'next/navigation'

import BackButton from './BackButton'
import { renderFakeComponent, spyNextNavigation } from '../../../configuration/testHelper'

describe('composant retour en arrière', () => {
  it('quand je clique sur le bouton alors je retourne en arrière', () => {
    // GIVEN
    vi.spyOn(navigation, 'useRouter').mockReturnValue(spyNextNavigation.useRouter)

    renderFakeComponent(
      <BackButton>
        {'Retour en arrière'}
      </BackButton>
    )

    // WHEN
    const boutonRetourEnArriere = screen.getByRole('button', { name: 'Retour en arrière' })
    fireEvent.click(boutonRetourEnArriere)

    // THEN
    expect(spyNextNavigation.useRouter.back).toHaveBeenCalledOnce()
  })
})
