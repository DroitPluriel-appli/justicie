import { GoogleApis } from 'googleapis'

import dataSource from '../../../database/dataSource'
import { importeDesLieux } from '../gateways/importerDesLieux'

async function main() {
  const orm = dataSource.initialize()
  await importeDesLieux(orm, new GoogleApis())
  await (await orm).destroy()
}

void main()
