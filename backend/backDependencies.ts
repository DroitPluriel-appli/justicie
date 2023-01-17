import dataSource from '../database/dataSource'
import { LieuLoader } from './entities/LieuLoader'
import { PostgreSQLLieuLoader } from './infrastructure/gateways/PostgreSQLLieuLoader'

type BackDependencies = Readonly<{
  lieuLoader: LieuLoader
  nombreDeLieuxAffichesParPage: number
  rayonDeRecherche: number
}>

const createDependencies = (): BackDependencies => {
  const orm = dataSource.initialize()

  return {
    lieuLoader: new PostgreSQLLieuLoader(orm),
    nombreDeLieuxAffichesParPage: 10,
    rayonDeRecherche: 2.5,
  }
}

export const backDependencies = createDependencies()
