import { screen, within } from '@testing-library/react'

import { fakeFrontDependencies, renderFakeComponent } from '../../configuration/testHelper'
import Header from './Header'

describe('en-tête de page', () => {
  const { paths, wording } = fakeFrontDependencies

  it('affiche les liens du menu en version desktop', () => {
    // WHEN
    renderFakeComponent(<Header />)

    // THEN
    const header = screen.getByRole('banner')
    const navigations = within(header).getAllByRole('navigation')
    const items = within(navigations[0]).getAllByRole('listitem')

    const accueil = within(items[0]).getByRole('link')
    expect(accueil).toHaveAttribute('href', paths.ACCUEIL)
    expect(accueil).toHaveAttribute('title', wording.ACCUEIL)

    const title = within(items[1]).getByRole('heading', { level: 1, name: wording.JUSTICE_PLURIELLE })
    expect(title).toBeInTheDocument()

    const nosCriteresDAccessibilite = within(items[2]).getByRole('link', { name: wording.NOS_CRITERES_D_ACCESSIBILITE })
    expect(nosCriteresDAccessibilite).toHaveAttribute('href', paths.NOS_CRITERES_D_ACCESSIBILITE)

    const politiqueDeGestionDesDonnees = within(items[3]).getByRole('link', { name: wording.POLITIQUE_DE_GESTION_DES_DONNEES })
    expect(politiqueDeGestionDesDonnees).toHaveAttribute('href', paths.POLITIQUE_DE_GESTION_DES_DONNEES)

    const rechercherLieuDeDroit = within(items[4]).getByRole('link', { name: wording.RECHERCHER_UN_LIEU_DE_DROIT })
    expect(rechercherLieuDeDroit).toHaveAttribute('href', paths.RECHERCHER_UN_LIEU_DE_DROIT)
  })

  it('affiche les liens du menu en version mobile', () => {
    // WHEN
    renderFakeComponent(<Header />)

    // THEN
    const header = screen.getByRole('banner')
    const navigations = within(header).getAllByRole('navigation')
    const items = within(navigations[1]).getAllByRole('listitem')

    const accueil = within(items[0]).getByRole('link')
    expect(accueil).toHaveAttribute('href', paths.ACCUEIL)
    expect(accueil).toHaveAttribute('title', wording.ACCUEIL)

    const title = within(items[1]).getByRole('heading', { level: 1, name: wording.JUSTICE_PLURIELLE })
    expect(title).toBeInTheDocument()

    const menu = within(items[2]).getByText(wording.MENU)
    expect(menu).toBeInTheDocument()
  })
})
