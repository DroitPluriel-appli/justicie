import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    coverage: {
      exclude: ['backend/backDependencies.ts', 'backend/infrastructure/controllers/importerDesLieuxCron.ts'],
      include: ['backend/**/*', 'components/**/*', 'configuration/**/*'],
      provider: 'istanbul',
      skipFull: true,
    },
    environment: 'jsdom',
    globals: true,
    sequence: { shuffle: true },
    setupFiles: ['vitest.setup.ts'],
    unstubEnvs: true,
    unstubGlobals: true,
  },
})
