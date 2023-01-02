import { DataSource, Repository } from 'typeorm'

import dataSource from '../../../database/dataSource'
import { LieuModel } from '../../../database/models/LieuModel'
import { LieuModelBuilder } from '../../../database/models/LieuModelBuilder'
import { LieuBuilder } from '../../entities/LieuBuilder'
import { recupereDesLieux } from './lieuxRepository'

describe('rechercher des lieux', () => {
  let orm: Promise<DataSource>
  let lieuRepository: Repository<LieuModel>

  beforeEach(async () => {
    orm = dataSource.initialize()
    lieuRepository = (await orm).getRepository(LieuModel)
  })

  afterEach(async () => {
    await (await orm).createQueryBuilder().delete().from(LieuModel).execute()
    await (await orm).destroy()
  })

  it('affiche la première page', async () => {
    // GIVEN
    await creeSeptLieux(lieuRepository)
    const latitude = 40.000000
    const longitude = 2.000000
    const page = 0
    const nombreDeLieuxAffichesParPage = 4

    // WHEN
    const lieux = await recupereDesLieux(orm, latitude, longitude, page, nombreDeLieuxAffichesParPage)

    // THEN
    expect(lieux).toStrictEqual([
      LieuBuilder.cree({ distance: 20.00000000000015, id: 1, latitude: 40.100000, longitude: 2.100000 }),
      LieuBuilder.cree({ distance: 21.99999999999993, id: 2, latitude: 40.110000, longitude: 2.110000 }),
      LieuBuilder.cree({ distance: 26.000000000000245, id: 4, latitude: 40.130000, longitude: 2.130000 }),
      LieuBuilder.cree({ distance: 28.00000000000007, id: 5, latitude: 40.140000, longitude: 2.140000 }),
    ])
  })

  it('affiche la seconde page', async () => {
    // GIVEN
    await creeSeptLieux(lieuRepository)
    const latitude = 40.000000
    const longitude = 2.000000
    const page = 1
    const nombreDeLieuxAffichesParPage = 4

    // WHEN
    const lieux = await recupereDesLieux(orm, latitude, longitude, page, nombreDeLieuxAffichesParPage)

    // THEN
    expect(lieux).toStrictEqual([LieuBuilder.cree({ distance: 29.99999999999985, id: 6, latitude: 40.150000, longitude: 2.150000 })])
  })

  it('affiche les lieux les plus près de l’adresse demandée', async () => {
    // GIVEN
    await creeSeptLieux(lieuRepository)
    const latitude = 40.000000
    const longitude = 2.000000

    // WHEN
    const lieux = await recupereDesLieux(orm, latitude, longitude)

    // THEN
    expect(lieux).toStrictEqual([
      LieuBuilder.cree({ distance: 20.00000000000015, id: 1, latitude: 40.100000, longitude: 2.100000 }),
      LieuBuilder.cree({ distance: 21.99999999999993, id: 2, latitude: 40.110000, longitude: 2.110000 }),
      LieuBuilder.cree({ distance: 26.000000000000245, id: 4, latitude: 40.130000, longitude: 2.130000 }),
      LieuBuilder.cree({ distance: 28.00000000000007, id: 5, latitude: 40.140000, longitude: 2.140000 }),
      LieuBuilder.cree({ distance: 29.99999999999985, id: 6, latitude: 40.150000, longitude: 2.150000 }),
    ])
  })

  it('ne retourne aucun lieux', async () => {
    // GIVEN
    await creeSeptLieux(lieuRepository)
    const latitude = 0.000000
    const longitude = 0.000000

    // WHEN
    const lieux = await recupereDesLieux(orm, latitude, longitude)

    // THEN
    expect(lieux).toStrictEqual([])
  })
})

async function creeSeptLieux(lieuRepository: Repository<LieuModel>) {
  await lieuRepository.insert([
    LieuModelBuilder.cree({ id: 6, latitude: 40.150000, longitude: 2.150000 }),
    LieuModelBuilder.cree({ id: 1, latitude: 40.100000, longitude: 2.100000 }),
    LieuModelBuilder.cree({ id: 2, latitude: 40.110000, longitude: 2.110000 }),
    LieuModelBuilder.cree({ id: 3, latitude: 40.120000, longitude: -2.120000 }),
    LieuModelBuilder.cree({ id: 4, latitude: 40.130000, longitude: 2.130000 }),
    LieuModelBuilder.cree({ id: 5, latitude: 40.140000, longitude: 2.140000 }),
    LieuModelBuilder.cree({ id: 7, latitude: 40.210000, longitude: 2.210000 }),
  ])
}
