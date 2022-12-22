import { DataSource, LoggerOptions } from 'typeorm'

import { dotEnvConfig } from './dotEnvConfig'
import { Lieu1671616928645 } from './migrations/1671616928645-lieu'
import { LieuModel } from './models/EntitéJuridiqueModel'

dotEnvConfig()

export default new DataSource({
  entities: [LieuModel],
  logger: 'debug',
  logging: [process.env.ORM_DEBUG] as LoggerOptions,
  migrations: [Lieu1671616928645],
  type: 'postgres',
  url: process.env.DATABASE_URL,
})
