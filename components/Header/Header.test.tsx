import { fireEvent, screen, within } from '@testing-library/react'

import Header from './Header'
import { fakeFrontDependencies, renderFakeComponent } from '../../configuration/testHelper'

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
    const logo = within(accueil).getByAltText(wording.ACCUEIL)
    expect(logo).toBeVisible()

    const title = within(items[1]).getByText(wording.JUSTICIE)
    expect(title).toBeVisible()

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

    const accueil = within(items[0]).getByRole('link')
    expect(accueil).toHaveAttribute('href', paths.ACCUEIL)
    const logo = within(accueil).getByAltText(wording.ACCUEIL)
    expect(logo).toBeVisible()

    const title = within(items[1]).getByText(wording.JUSTICIE)
    expect(title).toBeVisible()

    const menu = within(items[2]).getByText(wording.MENU)
    expect(menu).toBeVisible()
  })

  it('affiche le menu mobile quand on appuie sur le burger menu', () => {
    // GIVEN
    renderFakeComponent(<Header />)

    // WHEN
    ouvrirLeBurgerMenu(wording.MENU)

    // THEN
    const header = screen.getByRole('banner')
    const navigation = within(header).getByRole('navigation')
    const items = within(navigation).getAllByRole('listitem')

    const title = within(items[0]).getByText(wording.MENU)
    expect(title).toBeVisible()
    const fermer = within(items[0]).getByRole('button', { name: wording.FERMER })
    expect(fermer).toBeVisible()

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
    ouvrirLeBurgerMenu(wording.MENU)

    // WHEN
    fermerLeBurgerMenu(wording.FERMER)

    // THEN
    const header = screen.getByRole('banner')
    const navigationMobile = within(header).getByLabelText(wording.NAVIGATION_MOBILE, { selector: 'nav' })
    const items = within(navigationMobile).getAllByRole('listitem')

    const title = within(items[1]).getByText(wording.JUSTICIE)
    expect(title).toBeVisible()
  })

  it('étant donné que j’avait déjà enregistrer le thème sombre, quand j’affiche la page alors le thème sombre est actif', () => {
    // GIVEN
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('themeDark')

    // WHEN
    renderFakeComponent(<Header />)

    // THEN
    expect(document.body).toHaveClass('themeDark')
  })

  it('étant donné que j’avait déjà enregistrer le thème clair, quand j’affiche la page alors le thème clair est actif', () => {
    // GIVEN
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null)

    // WHEN
    renderFakeComponent(<Header />)

    // THEN
    expect(document.body).toHaveClass('themeLight')
  })
})

function ouvrirLeBurgerMenu(label: string) {
  cliquer(label)
}

function fermerLeBurgerMenu(label: string) {
  cliquer(label)
}

function cliquer(label: string) {
  fireEvent.click(screen.getByRole('button', { name: label }))
}
