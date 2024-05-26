import { render, RenderResult } from '@testing-library/react'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { ReadonlyURLSearchParams } from 'next/navigation'
import { ReactElement } from 'react'

import { FrontDependencies, frontDependencies } from './frontDependencies'
import { HookDependencies, hookDependencies } from './hookDependencies'
import { FrontContext, HookContext } from './useDependencies'

export const renderFakeComponent = (component: ReactElement, partialFakeHookDependencies: Partial<HookDependencies> = {}): RenderResult => {
  const frontContextValue = {
    ...fakeFrontDependencies,
  }
  const hookContextValue = {
    ...fakeHookDependencies,
    ...partialFakeHookDependencies,
  }

  return render(
    <FrontContext.Provider value={frontContextValue}>
      <HookContext.Provider value={hookContextValue}>
        <main>
          {component}
        </main>
      </HookContext.Provider>
    </FrontContext.Provider>
  )
}

export const fakeFrontDependencies: FrontDependencies = {
  ...frontDependencies,
}

const fakeHookDependencies: HookDependencies = {
  ...hookDependencies,
  ...fakeNavigation(),
}

export const textMatcher = (wording: string): (_: string, element: Element | null) => boolean => (_: string, element: Element | null): boolean => {
  return element?.textContent === wording
}

export const spyNextNavigation = {
  useRouter: {
    back: vi.fn(),
    forward: vi.fn(),
    prefetch: vi.fn(),
    push: vi.fn(),
    refresh: vi.fn(),
    replace: vi.fn(),
  },
}

export function fakeNavigation(
  searchParams = [
    { name: 'lat', value: '22' },
    { name: 'lon', value: '99' },
    { name: 'page', value: '0' },
  ],
  pathname = 'fake-pathname'
): { usePathname: () => string; useRouter: () => AppRouterInstance; useSearchParams: () => ReadonlyURLSearchParams } {
  return {
    usePathname: (): string => pathname,

    useRouter: (): AppRouterInstance => spyNextNavigation.useRouter,

    useSearchParams: (): ReadonlyURLSearchParams => ({
      entries: function* generateStringPairs(): IterableIterator<[string, string]> {
        for (const searchParam of searchParams) {
          yield [searchParam.name, searchParam.value]
        }
      },

      get: (name: string): string | null => {
        return searchParams.find((queryParam): boolean => queryParam.name === name)?.value ?? null
      },

      toString: (): string => {
        return searchParams
          .map((searchParam): string => searchParam.name + '=' + searchParam.value)
          .join('&')
      },
    }) as ReadonlyURLSearchParams,
  }
}
