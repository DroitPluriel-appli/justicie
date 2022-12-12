import { createContext, ReactElement, useContext } from 'react'

import { frontDependencies, FrontDependencies } from './frontDependencies'

export const Context = createContext<FrontDependencies>(frontDependencies)

export function useDependencies(): FrontDependencies {
  return { ...useContext<FrontDependencies>(Context) }
}

type ContextProviderProps = Readonly<{
  children: ReactElement[]
}>

export function ContextProvider({ children }: ContextProviderProps): ReactElement {
  return (
    <Context.Provider value={frontDependencies}>
      {children}
    </Context.Provider>
  )
}
