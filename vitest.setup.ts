import matchers from '@testing-library/jest-dom/matchers'
import { ReactElement } from 'react'
import { expect, vi } from 'vitest'

// pour éviter de changer les jest en vi mais il faudra le faire à terme quand strykerjs aura un runner pour vitest
// @ts-ignore
globalThis.jest = vi

// pour que les méthodes ".toXXX" fonctionnent
expect.extend(matchers)

// Cela permet de pouvoir tester ce qu'il y a dans <head>.
// https://github.com/vercel/next.js/discussions/11060
jest.mock('next/head', () => (
  {
    __esModule: true,
    default: ({ children }: { children: ReactElement[] }) => children,
  }
))
