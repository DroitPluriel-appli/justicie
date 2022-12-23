import { screen, within } from '@testing-library/react'
import mockRouter from 'next-router-mock'

import { fakeFrontDependencies, renderFakeComponent } from '../../configuration/testHelper'
import ResultatsListe from './ResultatsListe'

describe('résultats de recherche affichés en liste', () => {
  const { paths, wording } = fakeFrontDependencies
  const lat = '48.844928'
  const lon = '2.31016'
  const moteurTotal = 'on'

  it('affiche le titre de l’onglet', () => {
    // GIVEN
    mockRouter.query = {
      lat,
      lon,
    }

    // WHEN
    renderFakeComponent(<ResultatsListe lieux={[]} />)

    // THEN
    expect(document.title).toBe(wording.TITLE_PAGE_ADRESSE_LISTE)
  })

  it('affiche les liens de navigation et le titre', () => {
    // GIVEN
    mockRouter.query = {
      lat,
      lon,
      'moteur-total': moteurTotal,
    }

    // WHEN
    renderFakeComponent(<ResultatsListe lieux={[]} />)

    // THEN
    const modifierLAdresse = screen.getByRole('link', { name: wording.MODIFIER_L_ADRESSE })
    expect(modifierLAdresse).toHaveAttribute('href', paths.RECHERCHER_UNE_CONSULTATION_JURIDIQUE)
    const navigation = screen.getByRole('navigation')
    const itemsDeNavigation = within(navigation).getAllByRole('listitem')
    const vueListe = within(itemsDeNavigation[0]).getByRole('link', { name: wording.LISTE })
    expect(vueListe).toHaveAttribute('href', `${paths.RESULTATS_LISTE}?lat=${lat}&lon=${lon}&moteur-total=${moteurTotal}`)
    const vuePlan = within(itemsDeNavigation[1]).getByRole('link', { name: wording.PLAN })
    expect(vuePlan).toHaveAttribute('href', `${paths.RESULTATS_PLAN}?lat=${lat}&lon=${lon}&moteur-total=${moteurTotal}`)
    const modifierAccessibilite = screen.getByRole('link', { name: wording.BESOINS_D_ACCESSIBILITE(1) })
    expect(modifierAccessibilite).toHaveAttribute('href', `${paths.RECHERCHER_PAR_HANDICAP}?lat=${lat}&lon=${lon}&moteur-total=${moteurTotal}`)
    const titre = screen.getByText(wording.LIEUX_CORRESPONDENT_A_VOTRE_RECHERCHE(0), { selector: 'p' })
    expect(titre).toBeInTheDocument()
  })

  it('affiche une phrase demandant de recommencer le parcours quand on arrive sans latitude', () => {
    // GIVEN
    mockRouter.query = { lon }

    // WHEN
    renderFakeComponent(<ResultatsListe lieux={[]} />)

    // THEN
    const recommencer = screen.getByText(wording.RECOMMENCER_PARCOURS, { selector: 'p' })
    expect(recommencer).toBeInTheDocument()
  })

  it('affiche une phrase demandant de recommencer le parcours quand on arrive sans longitude', () => {
    // GIVEN
    mockRouter.query = { lat }

    // WHEN
    renderFakeComponent(<ResultatsListe lieux={[]} />)

    // THEN
    const recommencer = screen.getByText(wording.RECOMMENCER_PARCOURS, { selector: 'p' })
    expect(recommencer).toBeInTheDocument()
  })
})
