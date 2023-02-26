import '@testing-library/jest-dom/extend-expect'
import { ReactElement } from 'react'

global.fetch = jest.fn()

// Cela permet de pouvoir tester ce qu'il y a dans <head>.
// https://github.com/vercel/next.js/discussions/11060
jest.mock('next/head', () => (
  {
    __esModule: true,
    default: ({ children }: { children: ReactElement[] }) => children,
  }
))
