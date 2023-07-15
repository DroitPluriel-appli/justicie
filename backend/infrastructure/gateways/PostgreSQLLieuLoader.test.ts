import { DataSource } from 'typeorm'

import { PostgreSQLLieuLoader } from './PostgreSQLLieuLoader'
import dataSource from '../../../database/dataSource'
import { LieuModel } from '../../../database/models/LieuModel'
import { Critere } from '../../entities/Critere'
import { Lieu } from '../../entities/Lieu'

describe('lieu loader', () => {
  const orm = dataSource.initialize()
  const postgreSQLLieuLoader = new PostgreSQLLieuLoader(orm)

  afterEach(async () => {
    await (await orm).createQueryBuilder().delete().from(LieuModel).execute()
  })

  afterAll(async () => {
    await (await orm).destroy()
  })

  describe('récupérer un lieu', () => {
    it('récupère un lieu existant', async () => {
      // GIVEN
      await creeSeptLieux(orm)
      const latitude = 40.000000
      const longitude = 2.000000
      const idExistant = 1

      // WHEN
      const lieu = await postgreSQLLieuLoader.recupereUnLieu(idExistant, latitude, longitude)

      // THEN
      expect(lieu).toStrictEqual([Lieu.cree({ distance: 14, id: 1, latitude: 40.100000, longitude: 2.100000 })])
    })

    it('récupère un lieu inexistant', async () => {
      // GIVEN
      await creeSeptLieux(orm)
      const latitude = 0.000000
      const longitude = 0.000000
      const idInexistant = 10

      // WHEN
      const lieu = await postgreSQLLieuLoader.recupereUnLieu(idInexistant, latitude, longitude)

      // THEN
      expect(lieu).toStrictEqual([])
    })
  })

  describe('récupérer des lieux', () => {
    it('affiche la première page', async () => {
      // GIVEN
      await creeSeptLieux(orm)
      const latitude = 40.000000
      const longitude = 2.000000
      const criteres = new Set<Critere>()
      const page = 0
      const nombreDeLieuxAffichesParPage = 4

      // WHEN
      const lieux = await postgreSQLLieuLoader.recupereDesLieux(latitude, longitude, criteres, page, nombreDeLieuxAffichesParPage)

      // THEN
      expect(lieux).toStrictEqual({
        lieux: [
          Lieu.cree({ distance: 14, id: 1, latitude: 40.100000, longitude: 2.100000 }),
          Lieu.cree({ distance: 15, id: 2, latitude: 40.110000, longitude: 2.110000 }),
          Lieu.cree({ distance: 18, id: 4, latitude: 40.130000, longitude: 2.130000 }),
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
            id: 5,
            latitude: 40.140000,
            longitude: 2.140000,
          }),
        ],
        nombreDeResultat: 7,
      })
    })

    it('affiche la seconde page', async () => {
      // GIVEN
      await creeSeptLieux(orm)
      const latitude = 40.000000
      const longitude = 2.000000
      const criteres = new Set<Critere>()
      const page = 1
      const nombreDeLieuxAffichesParPage = 4

      // WHEN
      const lieux = await postgreSQLLieuLoader.recupereDesLieux(latitude, longitude, criteres, page, nombreDeLieuxAffichesParPage)

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
            id: 6,
            latitude: 40.150000,
            longitude: 2.150000,
          }),
          Lieu.cree({ distance: 29, id: 7, latitude: 40.210000, longitude: 2.210000 }),
          Lieu.cree({ distance: 350, id: 3, latitude: 40.120000, longitude: -2.120000 }),
        ],
        nombreDeResultat: 7,
      })
    })

    it('affiche les lieux dans un rayon de recherche', async () => {
      // GIVEN
      await creeSeptLieux(orm)
      const latitude = 40.000000
      const longitude = 2.000000
      const criteres = new Set<Critere>()
      const page = 0
      const nombreDeLieuxAffichesParPage = 10
      const rayonDeRechercheLimite = 22

      // WHEN
      const lieux = await postgreSQLLieuLoader.recupereDesLieux(latitude, longitude, criteres, page, nombreDeLieuxAffichesParPage, rayonDeRechercheLimite)

      // THEN
      expect(lieux).toStrictEqual({
        lieux: [
          Lieu.cree({ distance: 14, id: 1, latitude: 40.100000, longitude: 2.100000 }),
          Lieu.cree({ distance: 15, id: 2, latitude: 40.110000, longitude: 2.110000 }),
          Lieu.cree({ distance: 18, id: 4, latitude: 40.130000, longitude: 2.130000 }),
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
            id: 5,
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
            id: 6,
            latitude: 40.150000,
            longitude: 2.150000,
          }),
        ],
        nombreDeResultat: 5,
      })
    })

    it('affiche les lieux les plus près de l’adresse demandée', async () => {
      // GIVEN
      await creeSeptLieux(orm)
      const latitude = 40.000000
      const longitude = 2.000000
      const criteres = new Set<Critere>()

      // WHEN
      const lieux = await postgreSQLLieuLoader.recupereDesLieux(latitude, longitude, criteres)

      // THEN
      expect(lieux).toStrictEqual({
        lieux: [
          Lieu.cree({ distance: 14, id: 1, latitude: 40.100000, longitude: 2.100000 }),
          Lieu.cree({ distance: 15, id: 2, latitude: 40.110000, longitude: 2.110000 }),
          Lieu.cree({ distance: 18, id: 4, latitude: 40.130000, longitude: 2.130000 }),
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
            id: 5,
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
            id: 6,
            latitude: 40.150000,
            longitude: 2.150000,
          }),
          Lieu.cree({ distance: 29, id: 7, latitude: 40.210000, longitude: 2.210000 }),
          Lieu.cree({ distance: 350, id: 3, latitude: 40.120000, longitude: -2.120000 }),
        ],
        nombreDeResultat: 7,
      })
    })

    it('affiche les lieux selon différents besoins d’accessibilités', async () => {
      // GIVEN
      await creeSeptLieux(orm)
      const latitude = 40.000000
      const longitude = 2.000000
      const criteres = new Set<Critere>(['calme', 'pmr'])

      // WHEN
      const lieux = await postgreSQLLieuLoader.recupereDesLieux(latitude, longitude, criteres)

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
            id: 5,
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
            id: 6,
            latitude: 40.150000,
            longitude: 2.150000,
          }),
        ],
        nombreDeResultat: 2,
      })
    })

    it('ne retourne aucun lieux si aucun lieu ne correspond à la recherche', async () => {
      // GIVEN
      await creeSeptLieux(orm)
      const latitude = 0.000000
      const longitude = 0.000000
      const criteres = new Set<Critere>(['calme', 'pmr', 'bim'])

      // WHEN
      const lieux = await postgreSQLLieuLoader.recupereDesLieux(latitude, longitude, criteres)

      // THEN
      expect(lieux).toStrictEqual({
        lieux: [],
        nombreDeResultat: 0,
      })
    })
  })
})

async function creeSeptLieux(orm: Promise<DataSource>) {
  await (await orm)
    .getRepository(LieuModel)
    .insert([
      LieuModel.cree({ calme: true, id: 6, latitude: 40.150000, longitude: 2.150000, pmr: true }),
      LieuModel.cree({ id: 1, latitude: 40.100000, longitude: 2.100000 }),
      LieuModel.cree({ id: 2, latitude: 40.110000, longitude: 2.110000 }),
      LieuModel.cree({ id: 3, latitude: 40.120000, longitude: -2.120000 }),
      LieuModel.cree({ id: 4, latitude: 40.130000, longitude: 2.130000 }),
      LieuModel.cree({ calme: true, id: 5, latitude: 40.140000, longitude: 2.140000, pmr: true }),
      LieuModel.cree({ id: 7, latitude: 40.210000, longitude: 2.210000 }),
    ])
}
