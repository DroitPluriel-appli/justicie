import { CritereFront, criteres } from './criteres'
import { Paths } from './Paths'
import { WordingFr } from './WordingFr'

export type FrontDependencies = Readonly<{
  criteres: ReadonlyArray<CritereFront>
  date: Date,
  nombreDeLieuxAffichesParPage: number
  paths: Paths
  rayonDeRecherche: number
  wording: WordingFr
}>

export const frontDependencies: FrontDependencies = {
  criteres: criteres(new WordingFr()),
  date: new Date(),
  nombreDeLieuxAffichesParPage: 10,
  paths: new Paths(),
  rayonDeRecherche: 250,
  wording: new WordingFr(),
}
