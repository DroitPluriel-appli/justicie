import { createContext, useContext } from 'react'

import { frontDependencies, FrontDependencies } from './frontDependencies'

export const Context = createContext<FrontDependencies>(frontDependencies)

export function useDependencies(): FrontDependencies {
  return { ...useContext<FrontDependencies>(Context) }
}
