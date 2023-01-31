import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    clearMocks: true,
    coverage: {
      include: [
        'backend/**/*.ts',
        'components/**/*.ts?(x)',
      ],
      provider: 'istanbul',
    },
    environment: 'jsdom',
    globals: true,
    mockReset: true,
    outputDiffLines: 150,
    outputDiffMaxLines: 150,
    restoreMocks: true,
    sequence: { shuffle: true },
    setupFiles: ['vitest.setup.ts'],
  },
})
