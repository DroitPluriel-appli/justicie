import { DataSource } from 'typeorm'

import { PostgreSQLLieuLoader } from './PostgreSQLLieuLoader'
import dataSource from '../../../database/dataSource'
import { LieuModel } from '../../../database/models/LieuModel'
import { Critere } from '../../entities/Critere'
import { Lieu } from '../../entities/Lieu'
import { LieuLoader } from '../../entities/LieuLoader'

describe('lieu loader', () => {
  const orm: Promise<DataSource> = dataSource.initialize()
  const lieuLoader: LieuLoader = new PostgreSQLLieuLoader(orm)

  beforeEach(async () => {
    await (await orm).query('START TRANSACTION')
    await creeSeptLieux(orm)
  })

  afterEach(async () => {
    await (await orm).query('ROLLBACK TRANSACTION')
  })

  afterAll(async () => {
    await (await orm).destroy()
  })

  describe('quand on demande un lieu', () => {
    it('existant alors on le retourne', async () => {
      // GIVEN
      const latitude = 40.000000
      const longitude = 2.000000
      const idExistant = 10

      // WHEN
      const lieu = await lieuLoader.recupereUnLieu(idExistant, latitude, longitude)

      // THEN
      expect(lieu).toStrictEqual([Lieu.cree({ distance: 14, id: 10, latitude: 40.100000, longitude: 2.100000 })])
    })

    it('inexistant alors on ne retourne rien', async () => {
      // GIVEN
      const latitude = 0.000000
      const longitude = 0.000000
      const idInexistant = 666

      // WHEN
      const lieu = await lieuLoader.recupereUnLieu(idInexistant, latitude, longitude)

      // THEN
      expect(lieu).toStrictEqual([])
    })
  })

  describe('quand on demande des lieux selon une latitude et une longitude', () => {
    it('alors on les retourne sur la première page avec le nombre total de lieux', async () => {
      // GIVEN
      const latitude = 40.000000
      const longitude = 2.000000
      const criteres = new Set<Critere>()
      const page = 0
      const nombreDeLieuxAffichesParPage = 4

      // WHEN
      const lieux = await lieuLoader.recupereDesLieux(latitude, longitude, criteres, page, nombreDeLieuxAffichesParPage)

      // THEN
      expect(lieux).toStrictEqual({
        lieux: [
          Lieu.cree({ distance: 14, id: 10, latitude: 40.100000, longitude: 2.100000 }),
          Lieu.cree({ distance: 15, id: 20, latitude: 40.110000, longitude: 2.110000 }),
          Lieu.cree({ distance: 18, id: 40, latitude: 40.130000, longitude: 2.130000 }),
          Lieu.cree({
            criteres: {
              bim: false,
              calme: true,
              forme: false,
              lsf: false,
              pmr: true,
              pmr_assiste: true,
              visuel: true,
            },
            distance: 20,
            id: 50,
            latitude: 40.140000,
            longitude: 2.140000,
          }),
        ],
        nombreDeResultat: 7,
      })
    })

    it('alors on les retourne sur la seconde page', async () => {
      // GIVEN
      const latitude = 40.000000
      const longitude = 2.000000
      const criteres = new Set<Critere>()
      const page = 1
      const nombreDeLieuxAffichesParPage = 4

      // WHEN
      const lieux = await lieuLoader.recupereDesLieux(latitude, longitude, criteres, page, nombreDeLieuxAffichesParPage)

      // THEN
      expect(lieux).toStrictEqual({
        lieux: [
          Lieu.cree({
            criteres: {
              bim: false,
              calme: true,
              forme: false,
              lsf: false,
              pmr: true,
              pmr_assiste: true,
              visuel: true,
            },
            distance: 21,
            id: 60,
            latitude: 40.150000,
            longitude: 2.150000,
          }),
          Lieu.cree({ distance: 29, id: 70, latitude: 40.210000, longitude: 2.210000 }),
          Lieu.cree({ distance: 350, id: 30, latitude: 40.120000, longitude: -2.120000 }),
        ],
        nombreDeResultat: 7,
      })
    })

    it('alors on les retourne triés du plus près au plus loin des coordonnées demandées', async () => {
      // GIVEN
      const latitude = 40.000000
      const longitude = 2.000000
      const criteres = new Set<Critere>()

      // WHEN
      const lieux = await lieuLoader.recupereDesLieux(latitude, longitude, criteres)

      // THEN
      expect(lieux).toStrictEqual({
        lieux: [
          Lieu.cree({ distance: 14, id: 10, latitude: 40.100000, longitude: 2.100000 }),
          Lieu.cree({ distance: 15, id: 20, latitude: 40.110000, longitude: 2.110000 }),
          Lieu.cree({ distance: 18, id: 40, latitude: 40.130000, longitude: 2.130000 }),
          Lieu.cree({
            criteres: {
              bim: false,
              calme: true,
              forme: false,
              lsf: false,
              pmr: true,
              pmr_assiste: true,
              visuel: true,
            },
            distance: 20,
            id: 50,
            latitude: 40.140000,
            longitude: 2.140000,
          }),
          Lieu.cree({
            criteres: {
              bim: false,
              calme: true,
              forme: false,
              lsf: false,
              pmr: true,
              pmr_assiste: true,
              visuel: true,
            },
            distance: 21,
            id: 60,
            latitude: 40.150000,
            longitude: 2.150000,
          }),
          Lieu.cree({ distance: 29, id: 70, latitude: 40.210000, longitude: 2.210000 }),
          Lieu.cree({ distance: 350, id: 30, latitude: 40.120000, longitude: -2.120000 }),
        ],
        nombreDeResultat: 7,
      })
    })

    it('et avec un rayon de recherche alors on ne retourne que les lieux dans ce rayon', async () => {
      // GIVEN
      const latitude = 40.000000
      const longitude = 2.000000
      const criteres = new Set<Critere>()
      const page = 0
      const nombreDeLieuxAffichesParPage = 10
      const rayonDeRechercheLimite = 22

      // WHEN
      const lieux = await lieuLoader.recupereDesLieux(latitude, longitude, criteres, page, nombreDeLieuxAffichesParPage, rayonDeRechercheLimite)

      // THEN
      expect(lieux).toStrictEqual({
        lieux: [
          Lieu.cree({ distance: 14, id: 10, latitude: 40.100000, longitude: 2.100000 }),
          Lieu.cree({ distance: 15, id: 20, latitude: 40.110000, longitude: 2.110000 }),
          Lieu.cree({ distance: 18, id: 40, latitude: 40.130000, longitude: 2.130000 }),
          Lieu.cree({
            criteres: {
              bim: false,
              calme: true,
              forme: false,
              lsf: false,
              pmr: true,
              pmr_assiste: true,
              visuel: true,
            },
            distance: 20,
            id: 50,
            latitude: 40.140000,
            longitude: 2.140000,
          }),
          Lieu.cree({
            criteres: {
              bim: false,
              calme: true,
              forme: false,
              lsf: false,
              pmr: true,
              pmr_assiste: true,
              visuel: true,
            },
            distance: 21,
            id: 60,
            latitude: 40.150000,
            longitude: 2.150000,
          }),
        ],
        nombreDeResultat: 5,
      })
    })

    it('et avec différents besoins d’accessibilités alors on ne retourne que les lieux avec ces critères', async () => {
      // GIVEN
      const latitude = 40.000000
      const longitude = 2.000000
      const criteres = new Set<Critere>(['calme', 'pmr'])

      // WHEN
      const lieux = await lieuLoader.recupereDesLieux(latitude, longitude, criteres)

      // THEN
      expect(lieux).toStrictEqual({
        lieux: [
          Lieu.cree({
            criteres: {
              bim: false,
              calme: true,
              forme: false,
              lsf: false,
              pmr: true,
              pmr_assiste: true,
              visuel: true,
            },
            distance: 20,
            id: 50,
            latitude: 40.140000,
            longitude: 2.140000,
          }),
          Lieu.cree({
            criteres: {
              bim: false,
              calme: true,
              forme: false,
              lsf: false,
              pmr: true,
              pmr_assiste: true,
              visuel: true,
            },
            distance: 21,
            id: 60,
            latitude: 40.150000,
            longitude: 2.150000,
          }),
        ],
        nombreDeResultat: 2,
      })
    })

    it('mais qu’aucun lieu ne correspond à la recherche alors on ne retourne rien', async () => {
      // GIVEN
      const latitude = 0.000000
      const longitude = 0.000000
      const criteres = new Set<Critere>(['calme', 'pmr', 'bim'])

      // WHEN
      const lieux = await lieuLoader.recupereDesLieux(latitude, longitude, criteres)

      // THEN
      expect(lieux).toStrictEqual({
        lieux: [],
        nombreDeResultat: 0,
      })
    })
  })
})

async function creeSeptLieux(orm: Promise<DataSource>) {
  await (await orm).manager.save([
    LieuModel.cree({ calme: true, id: 60, latitude: 40.150000, longitude: 2.150000, pmr: true }),
    LieuModel.cree({ id: 10, latitude: 40.100000, longitude: 2.100000 }),
    LieuModel.cree({ id: 20, latitude: 40.110000, longitude: 2.110000 }),
    LieuModel.cree({ id: 30, latitude: 40.120000, longitude: -2.120000 }),
    LieuModel.cree({ id: 40, latitude: 40.130000, longitude: 2.130000 }),
    LieuModel.cree({ calme: true, id: 50, latitude: 40.140000, longitude: 2.140000, pmr: true }),
    LieuModel.cree({ id: 70, latitude: 40.210000, longitude: 2.210000 }),
  ], { transaction: false })
}
