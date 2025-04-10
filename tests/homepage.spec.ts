import { test, expect } from '@playwright/test'

test('homepage loads successfully', async ({ page }) => {
  // Navigate to the homepage
  await page.goto('http://localhost:3000/')

  // Wait for the title to be set
  await page.waitForFunction(() => document.title === 'DrunkCircle')

  // Check for the correct title of the homepage
  await expect(page).toHaveTitle('DrunkCircle')

  // Verify the presence of the PageCard component
  await expect(page.locator('div.card')).toBeVisible()
})
