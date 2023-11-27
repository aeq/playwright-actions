import { Page } from 'playwright'
import { Row } from './types'

export const resetAllRows = async (page: Page) => {
  await page.waitForURL('https://aeq.harvestapp.com/time/week')

  const delButtons = page.getByRole('button', { name: /Delete row/i })
  console.log(await delButtons.count())

  let finished = false

  while (!finished) {
    const button = await delButtons.first()

    try {
      await button.click({ timeout: 1000 })

      // confirm modal
      const confirm = page.getByRole('button', { name: 'Confirm delete' })
      if ((await confirm.count()) > 0) {
        await confirm.click()
      }

      await page.waitForResponse((response) => response.url().includes('https://aeq.harvestapp.com/entry/remove_row'))
    } catch (e) {
      finished = true
      break
    }
  }

  console.log(await page.locator('div.test-quote').innerHTML())
}

export const addRows = async (page: Page, rows: Row[]) => {
  for (const row of rows) {
    await addRow(page, row)
  }
  await hideLargeChangeDetectedModal(page)
}

export const addRow = async (page: Page, row: Row) => {
  const { project, task } = row

  await page.getByRole('button', { name: 'Add row' }).click()
  await page.locator('button[data-analytics-element-id=project-select]').click()
  await page.getByRole('option', { name: project }).click()

  await page.locator('button[data-analytics-element-id=task-select]').click()
  await page.getByRole('option', { name: task }).first().click()

  await page.getByRole('button', { name: 'Save row' }).click()

  await fillRow(page, row)
}

export const fillRow = async (page: Page, row: Row) => {
  const { values } = row

  // await page.getByRole('row', { name: row.task }).getByRole('textbox').nth(2).fill('99')

  // const inputs = page.locator('input[data-analytics-element-id=hours-input]')
  for (let i = 0; i < values.length; i++) {
    await page.getByRole('row', { name: row.task }).getByRole('textbox').nth(i).fill(values[i].toString())
    await hideLargeChangeDetectedModal(page)
  }
}

export const hideLargeChangeDetectedModal = async (page: Page) => {
  const button = page.getByRole('button', { name: 'Close warning' })
  if (await button.isVisible()) {
    await button.click()
  }
}
