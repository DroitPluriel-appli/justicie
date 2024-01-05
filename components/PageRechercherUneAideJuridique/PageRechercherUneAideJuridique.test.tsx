import { fireEvent, screen } from '@testing-library/react'

import PageRechercherUneAideJuridique from './PageRechercherUneAideJuridique'
import { fakeFrontDependencies, renderFakeComponent, textMatch } from '../../configuration/testHelper'

describe('page pour rechercher une aide juridique par géolocalisation ou par adresse', () => {
  const { paths, wording } = fakeFrontDependencies

  it('affiche le choix de la géolocalisation ou d’une adresse manuelle', () => {
    // GIVEN
    mockedGrantedPermissions()

    // WHEN
    renderFakeComponent(<PageRechercherUneAideJuridique />)

    // THEN
    const retourAlAccueil = screen.getByRole('link', { name: wording.RETOUR_A_L_ACCUEIL })
    expect(retourAlAccueil).toHaveAttribute('href', paths.ACCUEIL)

    const titre = screen.getByRole('heading', { level: 1, name: textMatch(wording.OU_RECHERCHEZ_VOUS + wording.OBLIGATOIRE) })
    expect(titre).toBeVisible()

    const utiliserMaPostionActuelle = screen.getByRole('button', { name: wording.UTILISER_MA_POSITION_ACTUELLE })
    expect(utiliserMaPostionActuelle).toBeVisible()

    const ou = screen.getByText(wording.OU)
    expect(ou).toBeVisible()

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
    expect(geolocalisationDesactivée).toBeVisible()

    const utiliserMaPostionActuelleGrisee = screen.getByRole('button', { name: wording.UTILISER_MA_POSITION_ACTUELLE })
    expect(utiliserMaPostionActuelleGrisee).toBeDisabled()
  })

  // Je n'arrive pas à faire fonctionner le mock
  // it.only('va à l’étape 2 quand j’utilise ma position actuelle avec le clic et grise le bouton', async () => {
  //   // GIVEN
  //   mockedGrantedPermissions()
  //   mockedSuccessedGeolocation(43.296482, 5.36978)
  //   const mockUseRouter = vi.fn(() => ({
  //     push: vi.fn(),
  //   }))
  //   vi.spyOn(fakeFrontDependencies, 'useRouter').mockImplementation(mockUseRouter)
  //   renderFakeComponent(<PageRechercherUneAideJuridique />)

  //   // WHEN
  //   utiliserMaPostionActuelle(wording.UTILISER_MA_POSITION_ACTUELLE)

  //   // THEN
  //   const utiliserMaPostionActuelleGrisee = await screen.findByRole('button', { name: wording.CHARGEMENT })
  //   expect(utiliserMaPostionActuelleGrisee).toBeDisabled()
  //   expect(mockUseRouter).toHaveBeenCalledWith(`${paths.RECHERCHER_PAR_HANDICAP}?lat=43.296482&lon=5.36978`)
  // })

  it('ne va pas à l’étape 2 quand je bloque la localisation de ma position actuelle', () => {
    // GIVEN
    mockedGrantedPermissions()
    mockedErrorGeolocation()
    renderFakeComponent(<PageRechercherUneAideJuridique />)

    // WHEN
    const positionActuelle = utiliserMaPostionActuelle(wording.UTILISER_MA_POSITION_ACTUELLE)

    // THEN
    expect(positionActuelle).toBeEnabled()
  })

  it('ne va pas à l’étape 2 quand c’est un vieu navigateur qui ne connait pas l’API navigator.permissions', () => {
    // GIVEN
    // @ts-ignore
    navigator.permissions = undefined
    mockedErrorGeolocation()
    renderFakeComponent(<PageRechercherUneAideJuridique />)

    // WHEN
    const positionActuelle = utiliserMaPostionActuelle(wording.UTILISER_MA_POSITION_ACTUELLE)

    // THEN
    const geolocalisationDesactivée = screen.getByText(wording.GEOLOCALISATION_DESACTIVEE, { selector: 'p' })
    expect(geolocalisationDesactivée).toBeVisible()
    expect(positionActuelle).toBeEnabled()
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

// function mockedSuccessedGeolocation(latitude: number, longitude: number) {
//   // @ts-ignore
//   navigator.geolocation = {
//     getCurrentPosition: (success: PositionCallback) => success({
//       coords: {
//         accuracy: 9075.79126982149,
//         altitude: null,
//         altitudeAccuracy: null,
//         heading: null,
//         latitude,
//         longitude,
//         speed: null,
//       },
//       timestamp: 1670251498462,
//     }),
//   }
// }

function mockedErrorGeolocation() {
  // @ts-ignore
  navigator.geolocation = {
    getCurrentPosition: (_: PositionCallback, error: PositionErrorCallback) => error({
      PERMISSION_DENIED: 1,
      POSITION_UNAVAILABLE: 2,
      TIMEOUT: 3,
      code: 1,
      message: 'string',
    }),
  }
}

function utiliserMaPostionActuelle(label: string) {
  const utiliserMaPostionActuelle = screen.getByRole('button', { name: label })

  fireEvent.click(utiliserMaPostionActuelle)

  return utiliserMaPostionActuelle
}
