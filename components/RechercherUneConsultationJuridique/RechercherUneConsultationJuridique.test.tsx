import { fireEvent, screen, waitFor } from '@testing-library/react'
import mockRouter from 'next-router-mock'

import { fakeFrontDependencies, renderFakeComponent, textMatch } from '../../configuration/testHelper'
import RechercherUneConsultationJuridique from './RechercherUneConsultationJuridique'

describe('rechercher un lieu', () => {
  const { paths, wording } = fakeFrontDependencies

  it('affiche le titre de l’onglet', () => {
    // WHEN
    renderFakeComponent(<RechercherUneConsultationJuridique />)

    // THEN
    expect(document.title).toBe(wording.TITLE_PAGE_RECHERCHER_UNE_CONSULTATION_JURIDIQUE)
  })

  it('affiche le choix de la géolocalisation ou d’une adresse manuelle', () => {
    // WHEN
    renderFakeComponent(<RechercherUneConsultationJuridique />)

    // THEN
    const retourAlAccueil = screen.getByRole('link', { name: wording.RETOUR_A_L_ACCUEIL })
    expect(retourAlAccueil).toHaveAttribute('href', paths.ACCUEIL)

    const title = screen.getByRole('heading', { level: 2, name: textMatch(wording.OU_RECHERCHEZ_VOUS + wording.OBLIGATOIRE) })
    expect(title).toBeInTheDocument()

    const utiliserMaPostionActuelle = screen.getByRole('button', { name: wording.UTILISER_MA_POSITION_ACTUELLE })
    expect(utiliserMaPostionActuelle).toBeInTheDocument()

    const ou = screen.getByText(wording.OU)
    expect(ou).toBeInTheDocument()

    const renseignerUneAdresse = screen.getByRole('link', { name: wording.RENSEIGNER_UNE_ADRESSE })
    expect(renseignerUneAdresse).toHaveAttribute('href', paths.RENSEIGNER_UNE_ADRESSE)
  })

  it.each([
    ['touchStart'],
    ['click'],
  ])('va à l’étape 2 quand j’utilise ma position actuelle avec le % et grise le bouton', async (event) => {
    // GIVEN
    mockedSuccessedGeolocation(43.296482, 5.36978)
    renderFakeComponent(<RechercherUneConsultationJuridique />)
    const utiliserMaPostionActuelle = screen.getByRole('button', { name: wording.UTILISER_MA_POSITION_ACTUELLE })

    // WHEN
    fireEvent[event as 'touchStart' | 'click'](utiliserMaPostionActuelle)

    // THEN
    const utiliserMaPostionActuelleGrisee = screen.getByRole('button', { name: wording.CHARGEMENT })
    expect(utiliserMaPostionActuelleGrisee).toBeDisabled()
    await waitFor(() => {
      expect(mockRouter.asPath).toBe(`/${paths.RECHERCHER_PAR_HANDICAP}?lat=43.296482&lon=5.36978`)
    })
  })

  it.each([
    ['Space'],
    ['Enter'],
  ])('va à l’étape 2 quand j’utilise ma position actuelle avec la touche %s et grise le bouton', async (code) => {
    // GIVEN
    mockedSuccessedGeolocation(43.296482, 5.36978)
    renderFakeComponent(<RechercherUneConsultationJuridique />)
    const utiliserMaPostionActuelle = screen.getByRole('button', { name: wording.UTILISER_MA_POSITION_ACTUELLE })

    // WHEN
    fireEvent.keyDown(utiliserMaPostionActuelle, { code })

    // THEN
    const utiliserMaPostionActuelleGrisee = screen.getByRole('button', { name: wording.CHARGEMENT })
    expect(utiliserMaPostionActuelleGrisee).toBeDisabled()
    await waitFor(() => {
      expect(mockRouter.asPath).toBe(`/${paths.RECHERCHER_PAR_HANDICAP}?lat=43.296482&lon=5.36978`)
    })
  })

  it('ne va pas à l’étape 2 quand je bloque la localisation de ma position actuelle', () => {
    // GIVEN
    mockedErrorGeolocation()
    renderFakeComponent(<RechercherUneConsultationJuridique />)
    const utiliserMaPostionActuelle = screen.getByRole('button', { name: wording.UTILISER_MA_POSITION_ACTUELLE })

    // WHEN
    fireEvent.keyDown(utiliserMaPostionActuelle, { code: 'Space' })

    // THEN
    expect(utiliserMaPostionActuelle).toBeEnabled()
  })
})

function mockedSuccessedGeolocation(latitude: number, longitude: number) {
  // @ts-ignore
  global.navigator.geolocation = {
    getCurrentPosition: (success: PositionCallback) => success({
      coords: {
        accuracy: 9075.79126982149,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        latitude,
        longitude,
        speed: null,
      },
      timestamp: 1670251498462,
    }),
  }
}

function mockedErrorGeolocation() {
  // @ts-ignore
  global.navigator.geolocation = {
    getCurrentPosition: (_: PositionCallback, error: PositionErrorCallback) => error({
      PERMISSION_DENIED: 0,
      POSITION_UNAVAILABLE: 0,
      TIMEOUT: 0,
      code: 0,
      message: 'string',
    }),
  }
}
