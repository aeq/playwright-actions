import { expect, test } from '@playwright/test'
import { resetAllRows, addRows } from './time'
import { Harvest } from '.'

test.describe('Harvest Time helpers', () => {
  test('resetAllRows', async ({ page }) => {
    await Harvest.loginWithGoogle(page, {
      username: process.env.GOOGLE_USERNAME || '',
      password: process.env.GOOLE_PASSWORD || '',
    })
    await page.goto('https://aeq.harvestapp.com/time/week')
    await resetAllRows(page)
    expect(await page.locator('div.test-quote')).toBeVisible()

    await new Promise((resolve) => setTimeout(resolve, 1000))
  })

  test('addRows', async ({ page }) => {
    await Harvest.loginWithGoogle(page, {
      username: process.env.GOOGLE_USERNAME || '',
      password: process.env.GOOLE_PASSWORD || '',
    })
    await page.goto('https://aeq.harvestapp.com/time/week')
    await resetAllRows(page)

    expect(await page.locator('div.test-quote')).toBeVisible()
    const rows = [
      { project: 'AEQ Internal', task: 'Company-wide Meeting', values: [1, 2, 3] },
      { project: 'AEQ Time Off', task: 'Paid Sick', values: [0, 0, 4, 5] },
      { project: 'AEQ Time Off', task: 'Paid Time Off', values: [0, 0, 0, 0, 0, 8] },
    ]

    await addRows(page, rows)

    for (const row of rows) {
      await expect(page.getByText(row.task)).toBeVisible()
    }

    await new Promise((resolve) => setTimeout(resolve, 1000))
  })
})
