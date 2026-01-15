import { defineConfig } from 'vitest/config';

export default defineConfig({
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
  test: {
    include: ['src/**/*.test.{js,ts,tsx}'],
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
});
