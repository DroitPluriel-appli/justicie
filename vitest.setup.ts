import { ReactElement } from 'react'
import { vi } from 'vitest'
// eslint-disable-next-line import/no-extraneous-dependencies
import 'vitest-dom/extend-expect'

// Cela permet de pouvoir tester ce qu'il y a dans <head>.
// https://github.com/vercel/next.js/discussions/11060
vi.mock('next/head', () => (
  {
    __esModule: true,
    default: ({ children }: { children: ReactElement[] }) => children,
  }
))
