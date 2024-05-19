import { createContext, useContext } from 'react'

import { frontDependencies, FrontDependencies } from './frontDependencies'
import { hookDependencies, HookDependencies } from './hookDependencies'

export const FrontContext = createContext<FrontDependencies>(frontDependencies)

export const HookContext = createContext<HookDependencies>(hookDependencies)

export function useDependencies(): FrontDependencies & HookDependencies {
  return {
    ...useContext<FrontDependencies>(FrontContext),
    ...useContext<HookDependencies>(HookContext),
  }
}
