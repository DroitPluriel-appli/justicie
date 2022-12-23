import { ParsedUrlQuery } from 'querystring'

import usePagePlan from './usePagePlan'

describe('queryToLatLngExpression', () => {
  it('renvoie les coordonées sous forme de nombres si elles sont valides', () => {
    // GIVEN
    const fakeQuery: ParsedUrlQuery = { lat: '50.09', lon: '-22.50' }
    const expectedPosition: L.LatLngExpression = [50.09, -22.50]
    const { queryToLatLngExpression } = usePagePlan()

    // WHEN
    const position = queryToLatLngExpression(fakeQuery)

    // THEN
    expect(position).toStrictEqual(expectedPosition)
  })
})
