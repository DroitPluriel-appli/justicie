import { ParsedUrlQuery } from 'querystring'

import usePagePlan from './usePagePlan'

describe('getPostion', () => {
  it('renvoie les coordonées sous forme de nombres si elles sont valides', () => {
    // GIVEN
    const fakeQuery: ParsedUrlQuery = { lat: '50.09', lon: '-22.50' }
    const expectedPosition: L.LatLngExpression = [50.09, -22.50]
    const { getPosition } = usePagePlan()

    // WHEN
    const position = getPosition(fakeQuery)

    // THEN
    expect(position).toStrictEqual(expectedPosition)
  })

  it('renvoie undefined si les coordonnées ne sont pas valides', () => {
    // GIVEN
    const fakeQuery: ParsedUrlQuery = { lat: 'wrong', lon: 'coords' }
    const { getPosition } = usePagePlan()

    // WHEN
    const position = getPosition(fakeQuery)

    // THEN
    expect(position).toBeUndefined()
  })
})
