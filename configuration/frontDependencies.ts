import { Paths } from './Paths'
import { Wording } from './wording/Wording'
import { WordingFr } from './wording/WordingFr'

export type FrontDependencies = Readonly<{
  paths: Paths
  wording: Wording
}>

export const frontDependencies: FrontDependencies = {
  paths: new Paths(),
  wording: new WordingFr(),
}
