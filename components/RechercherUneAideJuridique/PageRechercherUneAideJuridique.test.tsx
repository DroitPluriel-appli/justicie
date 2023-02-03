import { fireEvent, screen } from '@testing-library/react'
import mockRouter from 'next-router-mock'

import { fakeFrontDependencies, renderFakeComponent, textMatch } from '../../configuration/testHelper'
import PageRechercherUneAideJuridique from './PageRechercherUneAideJuridique'

describe('page pour rechercher une aide juridique par géolocalisation ou par adresse', () => {
  const { paths, wording } = fakeFrontDependencies

  it('affiche le titre de l’onglet', () => {
    // GIVEN
    mockedGrantedPermissions()

    // WHEN
    renderFakeComponent(<PageRechercherUneAideJuridique />)

    // THEN
    expect(document.title).toBe(wording.TITLE_PAGE_RECHERCHER_UNE_AIDE_JURIDIQUE)
  })

  it('affiche le choix de la géolocalisation ou d’une adresse manuelle', () => {
    // GIVEN
    mockedGrantedPermissions()

    // WHEN
    renderFakeComponent(<PageRechercherUneAideJuridique />)

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

  it('affiche un message demandant d’activer sa géolocalisation si elle est désactivée de manière permanente', async () => {
    // GIVEN
    mockedDeniedPermissions()

    // WHEN
    renderFakeComponent(<PageRechercherUneAideJuridique />)

    // THEN
    const geolocalisationDesactivée = await screen.findByText(wording.GEOLOCALISATION_DESACTIVEE, { selector: 'p' })
    expect(geolocalisationDesactivée).toBeInTheDocument()

    const utiliserMaPostionActuelleGrisee = screen.getByRole('button', { name: wording.UTILISER_MA_POSITION_ACTUELLE })
    expect(utiliserMaPostionActuelleGrisee).toBeDisabled()
  })

  it('va à l’étape 2 quand j’utilise ma position actuelle avec le clic et grise le bouton', async () => {
    // GIVEN
    mockedGrantedPermissions()
    mockedSuccessedGeolocation(43.296482, 5.36978)
    renderFakeComponent(<PageRechercherUneAideJuridique />)
    const utiliserMaPostionActuelle = screen.getByRole('button', { name: wording.UTILISER_MA_POSITION_ACTUELLE })

    // WHEN
    fireEvent.click(utiliserMaPostionActuelle)

    // THEN
    const utiliserMaPostionActuelleGrisee = await screen.findByRole('button', { name: wording.CHARGEMENT })
    expect(utiliserMaPostionActuelleGrisee).toBeDisabled()
    expect(mockRouter.asPath).toBe(`${paths.RECHERCHER_PAR_HANDICAP}?lat=43.296482&lon=5.36978`)
  })

  it('ne va pas à l’étape 2 quand je bloque la localisation de ma position actuelle', () => {
    // GIVEN
    mockedGrantedPermissions()
    mockedErrorGeolocation()
    renderFakeComponent(<PageRechercherUneAideJuridique />)
    const utiliserMaPostionActuelle = screen.getByRole('button', { name: wording.UTILISER_MA_POSITION_ACTUELLE })

    // WHEN
    fireEvent.click(utiliserMaPostionActuelle)

    // THEN
    expect(utiliserMaPostionActuelle).toBeEnabled()
  })

  it('ne va pas à l’étape 2 quand c’est un vieu navigateur qui ne connait pas l’API navigator.permissions', () => {
    // GIVEN
    // @ts-ignore
    navigator.permissions = undefined
    mockedErrorGeolocation()
    renderFakeComponent(<PageRechercherUneAideJuridique />)
    const utiliserMaPostionActuelle = screen.getByRole('button', { name: wording.UTILISER_MA_POSITION_ACTUELLE })

    // WHEN
    fireEvent.click(utiliserMaPostionActuelle)

    // THEN
    const geolocalisationDesactivée = screen.getByText(wording.GEOLOCALISATION_DESACTIVEE, { selector: 'p' })
    expect(geolocalisationDesactivée).toBeInTheDocument()
    expect(utiliserMaPostionActuelle).toBeEnabled()
  })
})

function mockedGrantedPermissions() {
  // @ts-ignore
  navigator.permissions = { query: () => ({ state: 'granted' }) }
}

function mockedDeniedPermissions() {
  // @ts-ignore
  navigator.permissions = { query: () => ({ state: 'denied' }) }
}

function mockedSuccessedGeolocation(latitude: number, longitude: number) {
  // @ts-ignore
  navigator.geolocation = {
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
  navigator.geolocation = {
    getCurrentPosition: (_: PositionCallback, error: PositionErrorCallback) => error({
      PERMISSION_DENIED: 1,
      POSITION_UNAVAILABLE: 0,
      TIMEOUT: 0,
      code: 1,
      message: 'string',
    }),
  }
}
