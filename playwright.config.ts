import { defineConfig } from '@playwright/test'

export default defineConfig({
  use: {
    browserName: 'chromium',
    headless: false,
    baseURL: 'https://circula-qa-challenge.vercel.app',
  },
  testDir: './tests',
  fullyParallel: true,
  shard: { total: 2, current: 1 }
})