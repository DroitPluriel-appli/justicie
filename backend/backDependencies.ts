import { LieuLoader } from './entities/LieuLoader'
import { PostgreSQLLieuLoader } from './infrastructure/gateways/PostgreSQLLieuLoader'
import dataSource from '../database/dataSource'

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
    rayonDeRecherche: 250,
  }
}

export const backDependencies = createDependencies()
