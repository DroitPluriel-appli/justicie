import { render, RenderResult } from '@testing-library/react'
import { useRouter } from 'next-router-mock'
import { ReactElement } from 'react'

import { frontDependencies } from './frontDependencies'
import { Context } from './useDependencies'

export const renderFakeComponent = (component: ReactElement): RenderResult => {
  return render(
    // @ts-ignore
    <Context.Provider value={fakeFrontDependencies}>
      <main>
        {component}
      </main>
    </Context.Provider>
  )
}

export const fakeFrontDependencies = {
  ...frontDependencies,
  nombreDeLieuxAffichesParPage: 10,
  useRouter,
}

export const textMatch = (wording: string) => (_: string, element?: Element | null): boolean => {
  return element?.textContent === wording
}
