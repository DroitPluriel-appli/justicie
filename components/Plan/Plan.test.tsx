import { fireEvent, screen, within } from '@testing-library/react'

import usePlan from '../../components/Plan/usePlan'
import { fakeFrontDependencies, renderFakeComponent } from '../../configuration/testHelper'
import Plan from './Plan'

describe('page résultats par plan', () => {
  const { wording } = fakeFrontDependencies
  const { iconSizeDefault, iconSizeSelected } = usePlan()

  it('affiche un marker bleu à la position choisie', () => {
    // WHEN
    const viewCenter: L.LatLngExpression = [51.505, -0.09]
    renderFakeComponent(
      <Plan
        lieux={[]}
        viewCenter={viewCenter}
      />
    )

    // THEN
    const main = screen.getByRole('main')
    const positionMarker = within(main).getByTitle(wording.TITRE_MARKER_POSITION)

    expect(positionMarker).toBeInTheDocument()
  })

  it('affiche plusieurs markers de lieux', () => {
    // GIVEN
    const fakeLieux = [
      {
        latLon: [-0.09, 51.500] as L.LatLngExpression,
        title: 'FakeLieuA',
      },
      {
        latLon: [-0.09, 51.520] as L.LatLngExpression,
        title: 'FakeLieuB',
      },
      {
        latLon: [-0.07, 51.505] as L.LatLngExpression,
        title: 'FakeLieuC',
      },
    ]
    const viewCenter: L.LatLngExpression = [51.505, -0.09]

    // WHEN
    renderFakeComponent(
      <Plan
        lieux={fakeLieux}
        viewCenter={viewCenter}
      />
    )

    // THEN
    const main = screen.getByRole('main')
    fakeLieux.map((lieu) => {
      const markerLieu = within(main).getByTitle(lieu.title)
      expect(markerLieu.tagName).toBe('IMG')
      expect(markerLieu).toHaveAttribute('src', 'marker-lieu.svg')
      expect(markerLieu).toHaveStyle({
        height: `${iconSizeDefault}px`,
        width: `${iconSizeDefault}px`,
      })
    })
  })

  // TESTS
  // [x] compléter tests markers pour vérifier img avec taille
  // [x] mocker click et tester changement de logo et de taille
  // [x] retour à la normal au click sur autre marker ?
  // [ ] tester affichage des infos dans popup au click sur marker

  it('change le marker lieu en rouge et + grand au click et le reset si click ailleur', () => {
    // GIVEN
    const lieux = [
      { latLon: [-0.09, 51.500] as L.LatLngExpression, title: 'FakeLieuA' },
      { latLon: [-0.09, 51.600] as L.LatLngExpression, title: 'FakeLieuB' },
    ]
    const viewCenter: L.LatLngExpression = [51.505, -0.09]

    // WHEN
    renderFakeComponent(
      <Plan
        lieux={lieux}
        viewCenter={viewCenter}
      />
    )
    const main = screen.getByRole('main')
    const markerLieuA = within(main).getByTitle(lieux[0].title)
    const markerLieuB = within(main).getByTitle(lieux[1].title)
    fireEvent.click(markerLieuA)

    // THEN
    expect(markerLieuA.tagName).toBe('IMG')
    expect(markerLieuA).toHaveAttribute('src', 'marker-lieu-selected.svg')
    expect(markerLieuA).toHaveStyle({
      height: `${iconSizeSelected}px`,
      width: `${iconSizeSelected}px`,
    })
    expect(markerLieuB.tagName).toBe('IMG')
    expect(markerLieuB).toHaveAttribute('src', 'marker-lieu.svg')
    expect(markerLieuB).toHaveStyle({
      height: `${iconSizeDefault}px`,
      width: `${iconSizeDefault}px`,
    })

    // WHEN
    fireEvent.click(markerLieuB)

    // THEN
    expect(markerLieuA.tagName).toBe('IMG')
    expect(markerLieuA).toHaveAttribute('src', 'marker-lieu.svg')
    expect(markerLieuA).toHaveStyle({
      height: `${iconSizeDefault}px`,
      width: `${iconSizeDefault}px`,
    })
    expect(markerLieuB.tagName).toBe('IMG')
    expect(markerLieuB).toHaveAttribute('src', 'marker-lieu-selected.svg')
    expect(markerLieuB).toHaveStyle({
      height: `${iconSizeSelected}px`,
      width: `${iconSizeSelected}px`,
    })
  })

})
