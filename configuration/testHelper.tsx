import { render, RenderResult } from '@testing-library/react'
import { ReactElement } from 'react'

import { FrontDependencies } from './frontDependencies'
import { Paths } from './Paths'
import { ContextProvider } from './useDependencies'
import { WordingFr } from './wording/WordingFr'

// Cela permet de pouvoir tester ce qu'il y a dans <head>.
// https://github.com/vercel/next.js/discussions/11060
jest.mock('next/head', () => (
  {
    __esModule: true,
    default: ({ children }: { children: ReactElement[] }) => children,
  }
))

export const renderFakeComponent = (component: ReactElement): RenderResult => {
  return render(
    <ContextProvider>
      <main>
        {component}
      </main>
      <div />
    </ContextProvider>
  )
}

export const fakeFrontDependencies: FrontDependencies = {
  paths: new Paths(),
  wording: new WordingFr(),
}

export const textMatch = (wording: string) => (_: string, element?: Element | null): boolean => {
  return element?.textContent === wording
}
