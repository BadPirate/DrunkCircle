// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  webServer: {
    command: 'yarn dev',
    port: 3000,
    reuseExistingServer: true, // Allow using an existing server instance
  },
  use: {
    baseURL: 'http://localhost:3000',
    headless: true, // Run tests in headless mode
  },
})
