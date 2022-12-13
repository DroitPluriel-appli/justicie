import { render, RenderResult } from '@testing-library/react'
import { ReactElement } from 'react'

import { frontDependencies } from './frontDependencies'
import { Context } from './useDependencies'

// Cela permet de pouvoir tester ce qu'il y a dans <head>.
// https://github.com/vercel/next.js/discussions/11060
jest.mock('next/head', () => (
  {
    __esModule: true,
    default: ({ children }: { children: ReactElement[] }) => children,
  }
))

export type FireEventOptions = Readonly<{
  target: {
    value: string
  }
}>

export const renderFakeComponent = (component: ReactElement): RenderResult => {
  return render(
    <Context.Provider value={fakeFrontDependencies}>
      <main>
        {component}
      </main>
    </Context.Provider>
  )
}

export const fakeFrontDependencies = frontDependencies

export const textMatch = (wording: string) => (_: string, element?: Element | null): boolean => {
  return element?.textContent === wording
}
