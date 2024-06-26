import { screen } from '@testing-library/react'

import PageRechercherParHandicap from './PageRechercherParHandicap'
import { fakeFrontDependencies, fakeNavigation, renderFakeComponent, textMatcher } from '../../configuration/testHelper'

describe('page de recherche par handicap', () => {
  const { criteres, paths, wording } = fakeFrontDependencies
  const lat = '48.844928'
  const lon = '2.31016'

  it('affiche les liens de navigation, le titre et le formulaire', () => {
    // GIVEN
    const searchParams = [
      { name: 'lat', value: lat },
      { name: 'lon', value: lon },
    ]

    // WHEN
    renderFakeComponent(<PageRechercherParHandicap />, fakeNavigation(searchParams))

    // THEN
    const modifierLAdresse = screen.getByRole('button', { name: wording.MODIFIER_L_ADRESSE })
    expect(modifierLAdresse).toBeVisible()
    const passer = screen.getByRole('link', { name: wording.PASSER })
    expect(passer).toHaveAttribute('href', `${paths.RESULTATS_LISTE}?lat=${lat}&lon=${lon}`)

    const title = screen.getByRole('heading', { level: 1, name: textMatcher(wording.BESOIN_EN_ACCESSIBILITE + wording.FACULTATIF) })
    expect(title).toBeVisible()
    criteres.forEach((critere) => {
      const checkbox = screen.getByRole('checkbox', { name: critere.title })
      expect(checkbox).toHaveAttribute('name', critere.name)
      const description = screen.getByText(textMatcher(critere.description), { selector: 'p' })
      expect(description).toBeVisible()
    })
    const latitude = screen.getByDisplayValue(lat)
    expect(latitude).toHaveAttribute('name', 'lat')
    const longitude = screen.getByDisplayValue(lon)
    expect(longitude).toHaveAttribute('name', 'lon')
    const suivant = screen.getByRole('button', { name: wording.AFFICHER_LES_RESULTATS })
    expect(suivant).toHaveAttribute('type', 'submit')
  })

  it('coche par défaut des besoins si on vient des résultats', () => {
    // GIVEN
    const searchParams = [
      { name: 'pmr', value: 'on' },
      { name: 'visuel', value: 'on' },
      { name: 'lat', value: lat },
      { name: 'lon', value: lon },
    ]

    // WHEN
    renderFakeComponent(<PageRechercherParHandicap />, fakeNavigation(searchParams))

    // THEN
    const pmr = screen.getByRole('checkbox', { name: criteres[0].title })
    expect(pmr).toHaveAttribute('checked', '')
    const pmrAssiste = screen.getByRole('checkbox', { name: criteres[1].title })
    expect(pmrAssiste).not.toHaveAttribute('checked')
    const visuel = screen.getByRole('checkbox', { name: criteres[2].title })
    expect(visuel).toHaveAttribute('checked', '')
    const lsf = screen.getByRole('checkbox', { name: criteres[3].title })
    expect(lsf).not.toHaveAttribute('checked')
    const bim = screen.getByRole('checkbox', { name: criteres[4].title })
    expect(bim).not.toHaveAttribute('checked')
    const calme = screen.getByRole('checkbox', { name: criteres[5].title })
    expect(calme).not.toHaveAttribute('checked')
    const forme = screen.getByRole('checkbox', { name: criteres[6].title })
    expect(forme).not.toHaveAttribute('checked')
  })
})
