import { fireEvent, screen, within } from '@testing-library/react'

import { fakeFrontDependencies, renderFakeComponent } from '../../configuration/testHelper'
import Header from './Header'

describe('en-tête de page', () => {
  const { paths, wording } = fakeFrontDependencies

  it('affiche les liens du menu en version desktop', () => {
    // WHEN
    renderFakeComponent(<Header />)

    // THEN
    const header = screen.getByRole('banner')
    const navigationDesktop = within(header).getByLabelText(wording.NAVIGATION_DESKTOP, { selector: 'nav' })
    const items = within(navigationDesktop).getAllByRole('listitem')

    const accueil = within(items[0]).getByRole('link', { name: wording.ACCUEIL })
    expect(accueil).toHaveAttribute('href', paths.ACCUEIL)

    const title = within(items[1]).getByRole('heading', { level: 1, name: wording.JUSTICE_PLURIELLE })
    expect(title).toBeInTheDocument()

    const nosCriteresDAccessibilite = within(items[2]).getByRole('link', { name: wording.NOS_CRITERES_D_ACCESSIBILITE })
    expect(nosCriteresDAccessibilite).toHaveAttribute('href', paths.NOS_CRITERES_D_ACCESSIBILITE)

    const politiqueDeGestionDesDonnees = within(items[3]).getByRole('link', { name: wording.POLITIQUE_DE_GESTION_DES_DONNEES })
    expect(politiqueDeGestionDesDonnees).toHaveAttribute('href', paths.POLITIQUE_DE_GESTION_DES_DONNEES)

    const rechercherLieuDeDroit = within(items[4]).getByRole('link', { name: wording.RECHERCHER_UNE_CONSULTATION_JURIDIQUE })
    expect(rechercherLieuDeDroit).toHaveAttribute('href', paths.RECHERCHER_UNE_CONSULTATION_JURIDIQUE)
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

  it.each([
    ['Space'],
    ['Enter'],
  ])('affiche le menu mobile quand on appuie sur le burger menu avec la touche %s', (code) => {
    // GIVEN
    renderFakeComponent(<Header />)
    const burgerMenu = screen.getByRole('button', { name: wording.MENU })

    // WHEN
    fireEvent.keyDown(burgerMenu, { code })

    // THEN
    const header = screen.getByRole('banner')
    const navigation = within(header).getByRole('navigation')
    const items = within(navigation).getAllByRole('listitem')

    const title = within(items[0]).getByText(wording.MENU)
    expect(title).toBeInTheDocument()
    const fermer = within(items[0]).getByRole('button', { name: wording.FERMER })
    expect(fermer).toBeInTheDocument()

    const accueil = within(items[1]).getByRole('link', { name: wording.ACCUEIL })
    expect(accueil).toHaveAttribute('href', paths.ACCUEIL)
    const rechercherLieuDeDroit = within(items[2]).getByRole('link', { name: wording.RECHERCHER_UNE_CONSULTATION_JURIDIQUE })
    expect(rechercherLieuDeDroit).toHaveAttribute('href', paths.RECHERCHER_UNE_CONSULTATION_JURIDIQUE)
    const nosCriteresDAccessibilite = within(items[3]).getByRole('link', { name: wording.NOS_CRITERES_D_ACCESSIBILITE })
    expect(nosCriteresDAccessibilite).toHaveAttribute('href', paths.NOS_CRITERES_D_ACCESSIBILITE)
    const politiqueDeGestionDesDonnees = within(items[4]).getByRole('link', { name: wording.POLITIQUE_DE_GESTION_DES_DONNEES })
    expect(politiqueDeGestionDesDonnees).toHaveAttribute('href', paths.POLITIQUE_DE_GESTION_DES_DONNEES)
  })

  it('affiche le menu mobile quand on appuie sur le burger menu avec le doigt', () => {
    // GIVEN
    renderFakeComponent(<Header />)
    const burgerMenu = screen.getByRole('button', { name: wording.MENU })

    // WHEN
    fireEvent.touchStart(burgerMenu)

    // THEN
    const header = screen.getByRole('banner')
    const navigation = within(header).getByRole('navigation')
    const items = within(navigation).getAllByRole('listitem')

    const title = within(items[0]).getByText(wording.MENU)
    expect(title).toBeInTheDocument()
    const fermer = within(items[0]).getByRole('button', { name: wording.FERMER })
    expect(fermer).toBeInTheDocument()
  })

  it.each([
    ['Space'],
    ['Enter'],
  ])('affiche le menu mobile quand on appuie sur le burger menu puis le ferme avec la touche %s', (code) => {
    // GIVEN
    renderFakeComponent(<Header />)
    const burgerMenu = screen.getByRole('button', { name: wording.MENU })
    fireEvent.keyDown(burgerMenu, { code })
    const fermer = screen.getByRole('button', { name: wording.FERMER })

    // WHEN
    fireEvent.keyDown(fermer, { code })

    // THEN
    const header = screen.getByRole('banner')
    const navigationMobile = within(header).getByLabelText(wording.NAVIGATION_MOBILE, { selector: 'nav' })
    const items = within(navigationMobile).getAllByRole('listitem')

    const title = within(items[1]).getByRole('heading', { level: 1, name: wording.JUSTICE_PLURIELLE })
    expect(title).toBeInTheDocument()
  })

  it('affiche le menu mobile quand on appuie sur le burger menu puis le ferme avec le doigt', () => {
    // GIVEN
    renderFakeComponent(<Header />)
    const burgerMenu = screen.getByRole('button', { name: wording.MENU })
    fireEvent.touchStart(burgerMenu)
    const fermer = screen.getByRole('button', { name: wording.FERMER })

    // WHEN
    fireEvent.touchStart(fermer)

    // THEN
    const header = screen.getByRole('banner')
    const navigationMobile = within(header).getByLabelText(wording.NAVIGATION_MOBILE, { selector: 'nav' })
    const items = within(navigationMobile).getAllByRole('listitem')

    const title = within(items[1]).getByRole('heading', { level: 1, name: wording.JUSTICE_PLURIELLE })
    expect(title).toBeInTheDocument()
  })
})
