import { expect, test } from '@playwright/test'
import { search } from './search'

test('Google -> searches for aeq', async ({ page }) => {
  await search(page, 'aequilibrium')
  expect(await page.title()).toBe('aequilibrium - Google Search')
  await page.getByRole('link', { name: /https:\/\/aequilibrium.com/i }).click()
  expect(await page.title()).toBe('Home Page - Aequilbrium')
})
