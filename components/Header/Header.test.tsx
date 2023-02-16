import { fireEvent, screen, within } from '@testing-library/react'

import { fakeFrontDependencies, renderFakeComponent } from '../../configuration/testHelper'
import Header from './Header'

describe('en-tête de page', () => {
  const { paths, wording } = fakeFrontDependencies

  it('affiche des liens pour naviguer à travers la page', () => {
    // WHEN
    renderFakeComponent(<Header />)

    // THEN
    const navigation = screen.getByRole('navigation', { name: wording.ACCES_RAPIDE })
    expect(navigation).toHaveAttribute('id', 'evitement')
    expect(navigation).toHaveAttribute('aria-label', wording.ACCES_RAPIDE)

    const list = within(navigation).getByRole('list')
    const listItems = within(list).getAllByRole('listitem')
    const allerAuContenu = within(listItems[0]).getByRole('link', { name: wording.EVITEMENT_ALLER_AU_CONTENU })
    expect(allerAuContenu).toHaveAttribute('href', '#contenu')
    const allerAuMenu = within(listItems[1]).getByRole('link', { name: wording.EVITEMENT_ALLER_AU_MENU })
    expect(allerAuMenu).toHaveAttribute('href', '#menu')
    const allerAuPiedDePage = within(listItems[2]).getByRole('link', { name: wording.EVITEMENT_ALLER_AU_PIED_DE_PAGE })
    expect(allerAuPiedDePage).toHaveAttribute('href', '#footer')
  })

  it('affiche les liens du menu en version desktop', () => {
    // WHEN
    renderFakeComponent(<Header />)

    // THEN
    const header = screen.getByRole('banner')
    expect(header).toHaveAttribute('id', 'menu')
    const navigationDesktop = within(header).getByLabelText(wording.NAVIGATION_DESKTOP, { selector: 'nav' })
    const items = within(navigationDesktop).getAllByRole('listitem')

    const accueil = within(items[0]).getByRole('link')
    expect(accueil).toHaveAttribute('href', paths.ACCUEIL)
    const logo = within(accueil).getByLabelText(wording.ACCUEIL)
    expect(logo).toBeInTheDocument()

    const title = within(items[1]).getByRole('heading', { level: 1, name: wording.JUSTICE_PLURIELLE })
    expect(title).toBeInTheDocument()

    const nosCriteresDAccessibilite = within(items[2]).getByRole('link', { name: wording.NOS_CRITERES_D_ACCESSIBILITE })
    expect(nosCriteresDAccessibilite).toHaveAttribute('href', paths.NOS_CRITERES_D_ACCESSIBILITE)

    const nosPartenaires = within(items[3]).getByRole('link', { name: wording.NOS_PARTENAIRES })
    expect(nosPartenaires).toHaveAttribute('href', paths.NOS_PARTENAIRES)

    const foireAuxQuestions = within(items[4]).getByRole('link', { name: wording.FOIRE_AUX_QUESTIONS })
    expect(foireAuxQuestions).toHaveAttribute('href', paths.FOIRE_AUX_QUESTIONS)

    const rechercherLieuDeDroit = within(items[5]).getByRole('link', { name: wording.RECHERCHER_UNE_AIDE_JURIDIQUE })
    expect(rechercherLieuDeDroit).toHaveAttribute('href', paths.RECHERCHER_UNE_AIDE_JURIDIQUE)
  })

  it('affiche les liens du menu en version mobile', () => {
    // WHEN
    renderFakeComponent(<Header />)

    // THEN
    const header = screen.getByRole('banner')
    const navigationMobile = within(header).getByLabelText(wording.NAVIGATION_MOBILE, { selector: 'nav' })

    const items = within(navigationMobile).getAllByRole('listitem')

    const accueil = within(items[0]).getByRole('link', { name: wording.ACCUEIL })
    expect(accueil).toHaveAttribute('href', paths.ACCUEIL)

    const title = within(items[1]).getByRole('heading', { level: 1, name: wording.JUSTICE_PLURIELLE })
    expect(title).toBeInTheDocument()

    const menu = within(items[2]).getByText(wording.MENU)
    expect(menu).toBeInTheDocument()
  })

  it('affiche le menu mobile quand on appuie sur le burger menu', () => {
    // GIVEN
    renderFakeComponent(<Header />)
    const burgerMenu = screen.getByRole('button', { name: wording.MENU })

    // WHEN
    fireEvent.click(burgerMenu)

    // THEN
    const header = screen.getByRole('banner')
    const navigation = within(header).getByRole('navigation')
    const items = within(navigation).getAllByRole('listitem')

    const title = within(items[0]).getByText(wording.MENU)
    expect(title).toBeInTheDocument()
    const fermer = within(items[0]).getByRole('button', { name: wording.FERMER })
    expect(fermer).toBeInTheDocument()

    const accueil = within(items[1]).getByRole('link')
    expect(accueil).toHaveAttribute('href', paths.ACCUEIL)

    const rechercherLieuDeDroit = within(items[2]).getByRole('link', { name: wording.RECHERCHER_UNE_AIDE_JURIDIQUE })
    expect(rechercherLieuDeDroit).toHaveAttribute('href', paths.RECHERCHER_UNE_AIDE_JURIDIQUE)

    const nosCriteresDAccessibilite = within(items[3]).getByRole('link', { name: wording.NOS_CRITERES_D_ACCESSIBILITE })
    expect(nosCriteresDAccessibilite).toHaveAttribute('href', paths.NOS_CRITERES_D_ACCESSIBILITE)

    const nosPartenaires = within(items[4]).getByRole('link', { name: wording.NOS_PARTENAIRES })
    expect(nosPartenaires).toHaveAttribute('href', paths.NOS_PARTENAIRES)

    const foireAuxQuestions = within(items[5]).getByRole('link', { name: wording.FOIRE_AUX_QUESTIONS })
    expect(foireAuxQuestions).toHaveAttribute('href', paths.FOIRE_AUX_QUESTIONS)
  })

  it('affiche le menu mobile quand on appuie sur le burger menu puis le ferme', () => {
    // GIVEN
    renderFakeComponent(<Header />)
    const burgerMenu = screen.getByRole('button', { name: wording.MENU })
    fireEvent.click(burgerMenu)
    const fermer = screen.getByRole('button', { name: wording.FERMER })

    // WHEN
    fireEvent.click(fermer)

    // THEN
    const header = screen.getByRole('banner')
    const navigationMobile = within(header).getByLabelText(wording.NAVIGATION_MOBILE, { selector: 'nav' })
    const items = within(navigationMobile).getAllByRole('listitem')

    const title = within(items[1]).getByRole('heading', { level: 1, name: wording.JUSTICE_PLURIELLE })
    expect(title).toBeInTheDocument()
  })
})
