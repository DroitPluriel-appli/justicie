import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from 'next/navigation'

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
  usePathname: () => string
  useRouter: () => AppRouterInstance
  useSearchParams: () => ReadonlyURLSearchParams
  wording: Wording
}>

export const frontDependencies: FrontDependencies = {
  criteres: criteres(new WordingFr()),
  date: new Date(),
  nombreDeLieuxAffichesParPage: 10,
  paths: new Paths(),
  rayonDeRecherche: 250,
  usePathname,
  useRouter,
  useSearchParams,
  wording: new WordingFr(),
}
