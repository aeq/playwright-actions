import { expect, test } from '@playwright/test'
import { resetAllRows } from './time'
import { Harvest } from '.'

test('Harvest -> resetAllRows', async ({ page }) => {
  await Harvest.loginWithGoogle(page, {
    username: process.env.GOOGLE_USERNAME || '',
    password: process.env.GOOLE_PASSWORD || '',
  })
  await page.goto('https://aeq.harvestapp.com/time/week')
  await resetAllRows(page)
  expect(await page.locator('div.test-quote')).toBeVisible()
})
