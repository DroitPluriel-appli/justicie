import { fireEvent, screen } from '@testing-library/react'
import singletonRouter from 'next/router'

import { fakeFrontDependencies, renderFakeComponent, textMatch } from '../../configuration/testHelper'
import RechercherUnLieu from './RechercherUnLieu'

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock('next/router', () => require('next-router-mock'))

describe('rechercher un lieu', () => {
  const { paths, wording } = fakeFrontDependencies

  it('affiche le choix de la géolocalisation ou d’une adresse manuelle', () => {
    // WHEN
    renderFakeComponent(<RechercherUnLieu />)

    // THEN
    const retourAlAccueil = screen.getByRole('link', { name: wording.RETOUR_A_L_ACCUEIL })
    expect(retourAlAccueil).toHaveAttribute('href', paths.ACCUEIL)

    const title = screen.getByRole('heading', { level: 2, name: textMatch(wording.OU_RECHERCHEZ_VOUS + wording.OBLIGATOIRE) })
    expect(title).toBeInTheDocument()

    const utiliserMaPostionActuelle = screen.getByRole('button', { name: wording.UTILISER_MA_POSITION_ACTUELLE })
    expect(utiliserMaPostionActuelle).toBeInTheDocument()

    const ou = screen.getByText(wording.OU)
    expect(ou).toBeInTheDocument()

    const renseignerUneAdresse = screen.getByRole('button', { name: wording.RENSEIGNER_UNE_ADRESSE })
    expect(renseignerUneAdresse).toBeInTheDocument()
  })

  it.each([
    ['touchStart'],
    ['click'],
  ])('va à l’étape 2 quand j’utilise ma position actuelle avec le %', (event) => {
    // GIVEN
    mockedGeoloc(43.296482, 5.36978)
    renderFakeComponent(<RechercherUnLieu />)
    const utiliserMaPostionActuelle = screen.getByRole('button', { name: wording.UTILISER_MA_POSITION_ACTUELLE })

    // WHEN
    fireEvent[event as 'touchStart' | 'click'](utiliserMaPostionActuelle)

    // THEN
    expect(singletonRouter.asPath).toBe(`/${paths.RECHERCHER_PAR_HANDICAP}?lat=43.296482&lon=5.36978`)
  })

  it.each([
    ['Space'],
    ['Enter'],
  ])('va à l’étape 2 quand j’utilise ma position actuelle avec la touche %s', (code) => {
    // GIVEN
    mockedGeoloc(43.296482, 5.36978)
    renderFakeComponent(<RechercherUnLieu />)
    const utiliserMaPostionActuelle = screen.getByRole('button', { name: wording.UTILISER_MA_POSITION_ACTUELLE })

    // WHEN
    fireEvent.keyDown(utiliserMaPostionActuelle, { code })

    // THEN
    expect(singletonRouter.asPath).toBe(`/${paths.RECHERCHER_PAR_HANDICAP}?lat=43.296482&lon=5.36978`)
  })
})

function mockedGeoloc(latitude: number, longitude: number) {
  const mockGeolocation = {
    getCurrentPosition: jest.fn()
      .mockImplementationOnce((success: PositionCallback) => Promise.resolve(success({
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
      }))),
  }
  // @ts-ignore
  global.navigator.geolocation = mockGeolocation
}
