import dataSource from '../database/dataSource'
import { LieuLoader } from './entities/LieuLoader'
import { PostgreSQLLieuLoader } from './infrastructure/gateways/PostgreSQLLieuLoader'

type BackDependencies = Readonly<{
  lieuLoader: LieuLoader
}>

const createDependencies = (): BackDependencies => {
  const orm = dataSource.initialize()

  return { lieuLoader: new PostgreSQLLieuLoader(orm) }
}

export const backDependencies = createDependencies()
