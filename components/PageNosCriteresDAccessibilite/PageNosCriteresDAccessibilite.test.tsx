import { screen, within } from '@testing-library/react'

import { fakeFrontDependencies, renderFakeComponent, textMatch } from '../../configuration/testHelper'
import PageNosCriteresDAccessibilite from './PageNosCriteresDAccessibilite'

describe('page des criteres d’accessibilite', () => {
  const { wording } = fakeFrontDependencies

  it('affiche le titre de l’onglet', () => {
    // WHEN
    renderFakeComponent(<PageNosCriteresDAccessibilite />)

    // THEN
    expect(document.title).toBe(wording.TITLE_PAGE_NOS_CRITERES_D_ACCESSIBILITE)
  })

  it('affiche le contenu', () => {
    // WHEN
    renderFakeComponent(<PageNosCriteresDAccessibilite />)
    const main = screen.getByRole('main')
    const articles = within(main).getAllByRole('article')

    // THEN
    const titlePage = within(main).getByRole('heading', { level: 2, name: wording.NOS_CRITERES_D_ACCESSIBILITE })
    expect(titlePage).toBeInTheDocument()

    const headerHandicapMoteurTotal = within(articles[0]).getByRole('banner')
    const titleHandicapMoteurTotal = within(headerHandicapMoteurTotal).getByRole('heading', { level: 1, name: wording.TITLE_HANDICAP_MOTEUR_TOTAL })
    expect(titleHandicapMoteurTotal).toBeInTheDocument()
    const descriptionHandicapMoteurTotal = within(articles[0]).getByText(wording.DESCRIPTION_HANDICAP_MOTEUR_TOTAL, { selector: 'p' })
    expect(descriptionHandicapMoteurTotal).toBeInTheDocument()

    const headerHandicapMoteurAvecAssistance = within(articles[1]).getByRole('banner')
    const titleHandicapMoteurAvecAssistance = within(headerHandicapMoteurAvecAssistance).getByRole('heading', { level: 1, name: wording.TITLE_HANDICAP_MOTEUR_AVEC_ASSISTANCE })
    expect(titleHandicapMoteurAvecAssistance).toBeInTheDocument()
    const descriptionHandicapMoteurAvecAssitance = within(articles[1]).getByText(wording.DESCRIPTION_HANDICAP_MOTEUR_AVEC_ASSISTANCE, { selector: 'p' })
    expect(descriptionHandicapMoteurAvecAssitance).toBeInTheDocument()

    const headerHandicapeVisuel = within(articles[2]).getByRole('banner')
    const titleHandicapVisuel = within(headerHandicapeVisuel).getByRole('heading', { level: 1, name: wording.TITLE_HANDICAP_VISUEL })
    expect(titleHandicapVisuel).toBeInTheDocument()
    const descriptionHandicapVisuel = within(articles[2]).getByText(textMatch(wording.DESCRIPTION_HANDICAP_VISUEL), { selector: 'p' })
    expect(descriptionHandicapVisuel).toBeInTheDocument()

    const headerLangueDesSignes = within(articles[3]).getByRole('banner')
    const titleLangueDesSignes = within(headerLangueDesSignes).getByRole('heading', { level: 1, name: wording.TITLE_LANGUE_DES_SIGNES_FRANCAISE })
    expect(titleLangueDesSignes).toBeInTheDocument()
    const descriptionLangueDesSignes = within(articles[3]).getByText(wording.DESCRIPTION_LANGUE_DES_SIGNES_FRANCAISE, { selector: 'p' })
    expect(descriptionLangueDesSignes).toBeInTheDocument()

    const headerBoucleAInduction = within(articles[4]).getByRole('banner')
    const titleBoucleAInduction = within(headerBoucleAInduction).getByRole('heading', { level: 1, name: wording.TITLE_BOUCLE_A_INDUCTION })
    expect(titleBoucleAInduction).toBeInTheDocument()
    const descriptionBoucleAInduction = within(articles[4]).getByText(wording.DESCRIPTION_BOUCLE_A_INDUCTION, { selector: 'p' })
    expect(descriptionBoucleAInduction).toBeInTheDocument()

    const headerEnvironnementCalme = within(articles[5]).getByRole('banner')
    const titleEnvironnementCalme = within(headerEnvironnementCalme).getByRole('heading', { level: 1, name: wording.TITLE_ENVIRONNEMENT_CALME })
    expect(titleEnvironnementCalme).toBeInTheDocument()
    const descriptionEnvironnementCalme = within(articles[5]).getByText(wording.DESCRIPTION_ENVIRONNEMENT_CALME, { selector: 'p' })
    expect(descriptionEnvironnementCalme).toBeInTheDocument()

    const headerPersonnelForme = within(articles[6]).getByRole('banner')
    const titlePersonnelForme = within(headerPersonnelForme).getByRole('heading', { level: 1, name: wording.TITLE_PERSONNEL_FORME })
    expect(titlePersonnelForme).toBeInTheDocument()
    const descriptionPersonnelForme = within(articles[6]).getByText(wording.DESCRIPTION_PERSONNEL_FORME, { selector: 'p' })
    expect(descriptionPersonnelForme).toBeInTheDocument()

    const retourHautDePage = screen.getByRole('link', { name: wording.RETOUR_EN_HAUT_DE_PAGE })
    expect(retourHautDePage).toHaveAttribute('href', '#evitement')
  })
})
