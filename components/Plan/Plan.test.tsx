import { screen, within } from '@testing-library/react'

import { fakeFrontDependencies, renderFakeComponent } from '../../configuration/testHelper'
import Plan from './Plan'

// - mocker useRouter

describe('page résultats par plan', () => {
  const { wording } = fakeFrontDependencies

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
    // WHEN
    const fakeLieux = [
      {
        latLong: [-0.09, 51.500] as L.LatLngExpression,
        title: 'FakeLieuA',
      },
      {
        latLong: [-0.09, 51.520] as L.LatLngExpression,
        title: 'FakeLieuB',
      },
      {
        latLong: [-0.07, 51.505] as L.LatLngExpression,
        title: 'FakeLieuC',
      },
    ]
    const viewCenter: L.LatLngExpression = [51.505, -0.09]
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
      expect(markerLieu).toBeInTheDocument()
    })

  })
})
