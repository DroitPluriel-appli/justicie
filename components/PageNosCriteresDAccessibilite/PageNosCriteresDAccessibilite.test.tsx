import { screen, within } from '@testing-library/react'

import PageNosCriteresDAccessibilite from './PageNosCriteresDAccessibilite'
import { fakeFrontDependencies, renderFakeComponent, textMatch } from '../../configuration/testHelper'

describe('page des criteres d’accessibilite', () => {
  const { wording } = fakeFrontDependencies

  it('affiche le contenu', () => {
    // WHEN
    renderFakeComponent(<PageNosCriteresDAccessibilite />)
    const articles = screen.getAllByRole('article')

    // THEN
    const titre = screen.getByRole('heading', { level: 1, name: wording.NOS_CRITERES_D_ACCESSIBILITE })
    expect(titre).toBeVisible()

    const headerHandicapMoteurTotal = within(articles[0]).getByRole('banner')
    const titleHandicapMoteurTotal = within(headerHandicapMoteurTotal).getByRole('heading', { level: 1, name: wording.TITLE_HANDICAP_MOTEUR_TOTAL })
    expect(titleHandicapMoteurTotal).toBeVisible()
    const descriptionHandicapMoteurTotal = within(articles[0]).getByText(wording.DESCRIPTION_HANDICAP_MOTEUR_TOTAL, { selector: 'p' })
    expect(descriptionHandicapMoteurTotal).toBeVisible()

    const headerHandicapMoteurAvecAssistance = within(articles[1]).getByRole('banner')
    const titleHandicapMoteurAvecAssistance = within(headerHandicapMoteurAvecAssistance).getByRole('heading', { level: 1, name: wording.TITLE_HANDICAP_MOTEUR_AVEC_ASSISTANCE })
    expect(titleHandicapMoteurAvecAssistance).toBeVisible()
    const descriptionHandicapMoteurAvecAssitance = within(articles[1]).getByText(wording.DESCRIPTION_HANDICAP_MOTEUR_AVEC_ASSISTANCE, { selector: 'p' })
    expect(descriptionHandicapMoteurAvecAssitance).toBeVisible()

    const headerHandicapeVisuel = within(articles[2]).getByRole('banner')
    const titleHandicapVisuel = within(headerHandicapeVisuel).getByRole('heading', { level: 1, name: wording.TITLE_HANDICAP_VISUEL })
    expect(titleHandicapVisuel).toBeVisible()
    const descriptionHandicapVisuel = within(articles[2]).getByText(textMatch(wording.DESCRIPTION_HANDICAP_VISUEL), { selector: 'p' })
    expect(descriptionHandicapVisuel).toBeVisible()

    const headerLangueDesSignes = within(articles[3]).getByRole('banner')
    const titleLangueDesSignes = within(headerLangueDesSignes).getByRole('heading', { level: 1, name: wording.TITLE_LANGUE_DES_SIGNES_FRANCAISE })
    expect(titleLangueDesSignes).toBeVisible()
    const descriptionLangueDesSignes = within(articles[3]).getByText(wording.DESCRIPTION_LANGUE_DES_SIGNES_FRANCAISE, { selector: 'p' })
    expect(descriptionLangueDesSignes).toBeVisible()

    const headerBoucleAInduction = within(articles[4]).getByRole('banner')
    const titleBoucleAInduction = within(headerBoucleAInduction).getByRole('heading', { level: 1, name: wording.TITLE_BOUCLE_A_INDUCTION })
    expect(titleBoucleAInduction).toBeVisible()
    const descriptionBoucleAInduction = within(articles[4]).getByText(wording.DESCRIPTION_BOUCLE_A_INDUCTION, { selector: 'p' })
    expect(descriptionBoucleAInduction).toBeVisible()

    const headerEnvironnementCalme = within(articles[5]).getByRole('banner')
    const titleEnvironnementCalme = within(headerEnvironnementCalme).getByRole('heading', { level: 1, name: wording.TITLE_ENVIRONNEMENT_CALME })
    expect(titleEnvironnementCalme).toBeVisible()
    const descriptionEnvironnementCalme = within(articles[5]).getByText(wording.DESCRIPTION_ENVIRONNEMENT_CALME, { selector: 'p' })
    expect(descriptionEnvironnementCalme).toBeVisible()

    const headerPersonnelForme = within(articles[6]).getByRole('banner')
    const titlePersonnelForme = within(headerPersonnelForme).getByRole('heading', { level: 1, name: wording.TITLE_PERSONNEL_FORME })
    expect(titlePersonnelForme).toBeVisible()
    const descriptionPersonnelForme = within(articles[6]).getByText(wording.DESCRIPTION_PERSONNEL_FORME, { selector: 'p' })
    expect(descriptionPersonnelForme).toBeVisible()

    const retourHautDePage = screen.getByRole('link', { name: wording.RETOUR_EN_HAUT_DE_PAGE })
    expect(retourHautDePage).toHaveAttribute('href', '#evitement')
  })
})
