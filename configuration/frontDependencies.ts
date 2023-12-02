import { NextRouter, useRouter } from 'next/router'

import { CritereFront, criteres } from './criteres'
import { Paths } from './Paths'
import { Wording } from './wording/Wording'
import { WordingFr } from './wording/WordingFr'

export type FrontDependencies = Readonly<{
  criteres: CritereFront[]
  date: Date,
  nombreDeLieuxAffichesParPage: number
  paths: Paths
  rayonDeRecherche: number
  useRouter: () => NextRouter
  wording: Wording
}>

export const frontDependencies: FrontDependencies = {
  criteres: criteres(new WordingFr()),
  date: new Date(),
  nombreDeLieuxAffichesParPage: 10,
  paths: new Paths(),
  rayonDeRecherche: 250,
  useRouter,
  wording: new WordingFr(),
}
