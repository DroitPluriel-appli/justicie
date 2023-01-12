import { NextRouter, useRouter } from 'next/router'
import { KeyboardEvent } from 'react'

import { Critere, criteres } from './criteres'
import { Paths } from './Paths'
import { Wording } from './wording/Wording'
import { WordingFr } from './wording/WordingFr'

export type FrontDependencies = Readonly<{
  criteres: Critere[]
  isTheGoodKeyCode: (event: KeyboardEvent<HTMLButtonElement>) => boolean
  nombreDeLieuxAffichesParPage: number
  paths: Paths
  useRouter: () => NextRouter
  wording: Wording
}>

export const frontDependencies: FrontDependencies = {
  criteres: criteres(new WordingFr()),
  isTheGoodKeyCode: (event: KeyboardEvent<HTMLButtonElement>) => event.code === 'Space' || event.code === 'Enter',
  nombreDeLieuxAffichesParPage: 10,
  paths: new Paths(),
  useRouter,
  wording: new WordingFr(),
}
