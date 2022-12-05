import { KeyboardEvent } from 'react'

import { Paths } from './Paths'
import { Wording } from './wording/Wording'
import { WordingFr } from './wording/WordingFr'

export type FrontDependencies = Readonly<{
  isTheGoodKeyCode: (event: KeyboardEvent<HTMLButtonElement>) => boolean
  paths: Paths
  wording: Wording
}>

export const frontDependencies: FrontDependencies = {
  isTheGoodKeyCode: (event: KeyboardEvent<HTMLButtonElement>) => event.code === 'Space' || event.code === 'Enter',
  paths: new Paths(),
  wording: new WordingFr(),
}
