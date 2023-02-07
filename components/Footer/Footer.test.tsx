import { screen, within } from '@testing-library/react'

import { fakeFrontDependencies, renderFakeComponent, textMatch } from '../../configuration/testHelper'
import Footer from './Footer'

describe('pied de page', () => {
  const { paths, wording } = fakeFrontDependencies

  it('affiche les liens', () => {
    // WHEN
    renderFakeComponent(<Footer />)

    // THEN
    const footer = screen.getByRole('contentinfo')
    const sections = within(footer).getAllByRole('region')

    const justicePlurielle = within(sections[0]).getByRole('banner')
    expect(justicePlurielle.textContent).toBe(wording.INFORMATIONS)
    const liensJusticePlurielle = within(sections[0]).getAllByRole('listitem')
    const rechercherUneAideJuridique = within(liensJusticePlurielle[0]).getByRole('link', { name: wording.RECHERCHER_UNE_AIDE_JURIDIQUE })
    expect(rechercherUneAideJuridique).toHaveAttribute('href', paths.RECHERCHER_UNE_AIDE_JURIDIQUE)
    const criteresDAccessibilite = within(liensJusticePlurielle[1]).getByRole('link', { name: wording.NOS_CRITERES_D_ACCESSIBILITE })
    expect(criteresDAccessibilite).toHaveAttribute('href', paths.NOS_CRITERES_D_ACCESSIBILITE)
    const politiqueGestionDesDonnees = within(liensJusticePlurielle[2]).getByRole('link', { name: wording.POLITIQUE_DE_CONFIDENTIALITE })
    expect(politiqueGestionDesDonnees).toHaveAttribute('href', paths.POLITIQUE_DE_CONFIDENTIALITE)
    const foireAuxQuestions = within(liensJusticePlurielle[3]).getByRole('link', { name: wording.FOIRE_AUX_QUESTIONS })
    expect(foireAuxQuestions).toHaveAttribute('href', paths.FOIRE_AUX_QUESTIONS)

    const qualiteDeService = within(sections[1]).getByRole('banner')
    expect(qualiteDeService.textContent).toBe(wording.QUALITE_DE_SERVICE)
    const liensQualiteDeService = within(sections[1]).getAllByRole('listitem')
    expect(liensQualiteDeService[0].textContent).toBe(wording.ACCESSIBILITE)
    const date = new Date()
    const copyright = within(footer).getByText(textMatch(wording.COPYRIGHT(date.getFullYear()) + wording.MENTIONS_LEGALES), { selector: 'p' })
    const mentionsLegales = within(copyright).getByRole('link', { name: wording.MENTIONS_LEGALES })
    expect(mentionsLegales).toHaveAttribute('href', paths.MENTIONS_LEGALES)
  })
})
