import { sheets } from '@googleapis/sheets'

import dataSource from '../../../database/dataSource'
import { importeDesLieux } from '../gateways/importerDesLieux'

async function main() {
  const orm = dataSource.initialize()
  await importeDesLieux(orm, sheets)
  await (await orm).destroy()
}

void main()
