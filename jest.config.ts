import nextJest from 'next/jest'

import type { Config } from '@jest/types'

const createJestConfig = nextJest({ dir: './' })

const customJestConfig: Config.InitialOptions = {
  clearMocks: true,
  collectCoverageFrom: [
    'backend/**/*.ts',
    'components/**/*.ts?(x)',
    'configuration/**/*.ts?(x)',
  ],
  fakeTimers: { now: 1664703388050 }, // 2022-01-01T23:00:00.135Z
  maxWorkers: 4,
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
  ],
  resetMocks: true,
  restoreMocks: true,
  setupFilesAfterEnv: ['./jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  testMatch: [
    '<rootDir>/backend/**/*(*.)@(test).ts',
    '<rootDir>/components/**/*(*.)@(test).tsx',
  ],
}

async function jestConfig() {
  const nextJestConfig = await createJestConfig(customJestConfig)()

  nextJestConfig.transformIgnorePatterns[0] = '/node_modules/(?!uuid)/'

  // Stryker ne fonctionne pas à cause de l'async https://github.com/stryker-mutator/stryker-js/issues/3480
  // Pour que les mutants naissent, il faut générer ce fichier donc lancer au moins un test
  require('fs').writeFileSync('jest-for-mutation-testing.json', JSON.stringify(nextJestConfig, null, 2))

  return nextJestConfig
}

module.exports = jestConfig
