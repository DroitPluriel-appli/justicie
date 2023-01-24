import matchers from '@testing-library/jest-dom/matchers'
import { expect, vi } from 'vitest'

// pour éviter de changer les jest en vi mais il faudra le faire à terme quand strykerjs aura un runner pour vitest
// @ts-ignore
globalThis.jest = vi

// pour que les méthodes ".toXXX" fonctionnent
expect.extend(matchers)
