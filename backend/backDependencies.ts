import dataSource from '../database/dataSource'
import { LieuLoader } from './entities/LieuLoader'
import { PostgreSQLLieuLoader } from './infrastructure/gateways/PostgreSQLLieuLoader'

type BackDependencies = Readonly<{
  lieuLoader: LieuLoader
  nombreDeLieuxAffichesParPage: number
}>

const createDependencies = (): BackDependencies => {
  const orm = dataSource.initialize()

  return {
    // @ts-ignore
    lieuLoader: new PostgreSQLLieuLoader(orm),
    nombreDeLieuxAffichesParPage: 10,
  }
}

export const backDependencies = createDependencies()
