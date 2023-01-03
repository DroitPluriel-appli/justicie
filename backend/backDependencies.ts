import dataSource from '../database/dataSource'
import { LieuLoader } from './entities/LieuLoader'
import { PostgreSQLLieuLoader } from './infrastructure/gateways/PostgreSQLLieuLoader'

type BackDependencies = Readonly<{
  lieuLoader: LieuLoader
}>

export function backDependencies(): BackDependencies {
  const orm = dataSource.initialize()

  return { lieuLoader: new PostgreSQLLieuLoader(orm) }
}
