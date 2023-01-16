import { screen } from '@testing-library/react'
import mockRouter from 'next-router-mock'

import { fakeFrontDependencies, renderFakeComponent, textMatch } from '../../configuration/testHelper'
import RechercherParHandicap from './RechercherParHandicap'

describe('rechercher par handicap', () => {
  const { criteres, paths, wording } = fakeFrontDependencies
  const lat = '48.844928'
  const lon = '2.31016'

  it('affiche le titre de l’onglet', () => {
    // GIVEN
    mockRouter.query = {
      lat,
      lon,
    }

    // WHEN
    renderFakeComponent(<RechercherParHandicap />)

    // THEN
    expect(document.title).toBe(wording.TITLE_PAGE_RECHERCHER_PAR_HANDICAP)
  })

  it('affiche les liens de navigation, le titre et le formulaire', () => {
    // GIVEN
    mockRouter.query = {
      lat,
      lon,
    }

    // WHEN
    renderFakeComponent(<RechercherParHandicap />)

    // THEN
    const modifierLAdresse = screen.getByRole('button', { name: wording.MODIFIER_L_ADRESSE })
    expect(modifierLAdresse).toBeInTheDocument()
    const passer = screen.getByRole('link', { name: wording.PASSER })
    expect(passer).toHaveAttribute('href', `${paths.RESULTATS_LISTE}?lat=${lat}&lon=${lon}`)

    const title = screen.getByRole('heading', { level: 2, name: textMatch(wording.BESOIN_EN_ACCESSIBILITE + wording.FACULTATIF) })
    expect(title).toBeInTheDocument()
    criteres.forEach((critere) => {
      const checkbox = screen.getByRole('checkbox', { name: critere.title })
      expect(checkbox).toHaveAttribute('name', critere.name)
      const description = screen.getByText(textMatch(critere.description), { selector: 'p' })
      expect(description).toBeInTheDocument()
    })
    const latitude = screen.getByDisplayValue(lat)
    expect(latitude).toHaveAttribute('name', 'lat')
    const longitude = screen.getByDisplayValue(lon)
    expect(longitude).toHaveAttribute('name', 'lon')
    const suivant = screen.getByRole('button', { name: wording.SUIVANT })
    expect(suivant).toHaveAttribute('type', 'submit')
  })

  it('affiche une phrase demandant de recommencer le parcours quand on arrive sans latitude', () => {
    // GIVEN
    mockRouter.query = { lon }

    // WHEN
    renderFakeComponent(<RechercherParHandicap />)

    // THEN
    const recommencer = screen.getByText(wording.RECOMMENCER_PARCOURS, { selector: 'p' })
    expect(recommencer).toBeInTheDocument()
  })

  it('affiche une phrase demandant de recommencer le parcours quand on arrive sans longitude', () => {
    // GIVEN
    mockRouter.query = { lat }

    // WHEN
    renderFakeComponent(<RechercherParHandicap />)

    // THEN
    const recommencer = screen.getByText(wording.RECOMMENCER_PARCOURS, { selector: 'p' })
    expect(recommencer).toBeInTheDocument()
  })
})
