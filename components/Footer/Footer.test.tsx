import { fireEvent, screen, within } from '@testing-library/react'

import Footer from './Footer'
import { fakeFrontDependencies, renderFakeComponent, textMatch } from '../../configuration/testHelper'

describe('pied de page', () => {
  const { date, paths, wording } = fakeFrontDependencies

  beforeEach(() => {
    vi.stubGlobal('tarteaucitron', { userInterface: { openPanel: vi.fn() } })
    vi.stubEnv('NODE_ENV', 'production')
  })

  it('affiche les liens', () => {
    // WHEN
    renderFakeComponent(<Footer />)

    // THEN
    const footer = screen.getByRole('contentinfo')
    expect(footer).toHaveAttribute('id', 'footer')
    const sections = within(footer).getAllByRole('region')

    const justicie = within(sections[0]).getByRole('banner')
    expect(justicie.textContent).toBe(wording.INFORMATIONS)
    const liensJusticie = within(sections[0]).getAllByRole('listitem')
    const rechercherUneAideJuridique = within(liensJusticie[0]).getByRole('link', { name: wording.RECHERCHER_UNE_AIDE_JURIDIQUE })
    expect(rechercherUneAideJuridique).toHaveAttribute('href', paths.RECHERCHER_UNE_AIDE_JURIDIQUE)
    const criteresDAccessibilite = within(liensJusticie[1]).getByRole('link', { name: wording.NOS_CRITERES_D_ACCESSIBILITE })
    expect(criteresDAccessibilite).toHaveAttribute('href', paths.NOS_CRITERES_D_ACCESSIBILITE)
    const nosPartenaires = within(liensJusticie[2]).getByRole('link', { name: wording.NOS_PARTENAIRES })
    expect(nosPartenaires).toHaveAttribute('href', paths.NOS_PARTENAIRES)
    const politiqueDeConfidentialite = within(liensJusticie[3]).getByRole('link', { name: wording.POLITIQUE_DE_CONFIDENTIALITE })
    expect(politiqueDeConfidentialite).toHaveAttribute('href', paths.POLITIQUE_DE_CONFIDENTIALITE)
    const foireAuxQuestions = within(liensJusticie[4]).getByRole('link', { name: wording.FOIRE_AUX_QUESTIONS })
    expect(foireAuxQuestions).toHaveAttribute('href', paths.FOIRE_AUX_QUESTIONS)

    const qualiteDeService = within(sections[1]).getByRole('banner')
    expect(qualiteDeService.textContent).toBe(wording.QUALITE_DE_SERVICE)
    const liensQualiteDeService = within(sections[1]).getAllByRole('listitem')
    expect(liensQualiteDeService[0].textContent).toBe(wording.ACCESSIBILITE)
    const copyright = within(footer).getByText(textMatch(wording.COPYRIGHT(date.getFullYear()) + wording.MENTIONS_LEGALES), { selector: 'p' })
    const mentionsLegales = within(copyright).getByRole('link', { name: wording.MENTIONS_LEGALES })
    expect(mentionsLegales).toHaveAttribute('href', paths.MENTIONS_LEGALES)

    const gestionDesCookies = within(sections[1]).getByRole('button')
    expect(gestionDesCookies.textContent).toBe(wording.GERER_LES_COOKIES)
  })

  it('ouvre le panneau de gestion des cookies', () => {
    // GIVEN
    renderFakeComponent(<Footer />)

    // WHEN
    ouvrirLePanneauDeGestionDesCookies()

    // THEN
    expect(window.tarteaucitron.userInterface.openPanel).toHaveBeenCalledTimes(1)
  })
})

function ouvrirLePanneauDeGestionDesCookies() {
  const footer = screen.getByRole('contentinfo')
  const sections = within(footer).getAllByRole('region')
  const gestionDesCookies = within(sections[1]).getByRole('button')
  fireEvent.click(gestionDesCookies)
}
