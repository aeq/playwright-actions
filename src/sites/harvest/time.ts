import { Page } from 'playwright'

export const resetAllRows = async (page: Page) => {
  await page.waitForURL('https://aeq.harvestapp.com/time/week')

  const delButtons = page.getByRole('button', { name: /Delete row/i })

  await Promise.all([
    (await delButtons.all()).map(async (button) => {
      await button.click()

      const confirm = page.getByRole('button', { name: 'Confirm delete' })
      if ((await confirm.count()) > 0) {
        await confirm.click()
      }

      await page.waitForResponse((response) => response.url().includes('https://aeq.harvestapp.com/entry/remove_row'))
    }),
  ])
  // await page.getByRole('button', { name: /Delete row/i }).click()
  // await new Promise((resolve) => setTimeout(resolve, 1000))

  // if (countButtons > 0) {
  //   for (let i = 0; i <= countButtons; i++) {
  //     con
  //     await delButtons.nth(i).click()
  //     // const confirm = page.getByLabel('Confirm delete', { exact: true })
  //     // if ((await confirm.count()) > 0) {
  //     //   confirm.click()
  //     // }
  //   }
  // }

  console.log(await page.locator('div.test-quote').innerHTML())
}

export const addRow = async (page: Page, row: string) => {
  await page.getByRole('button', { name: 'Add row' }).click()
  await page.getByRole('button', { name: 'AEQ AEQ Internal' }).click()
  await page.getByRole('option', { name: row }).click()

  await page.getByRole('option', { name: 'AEQ Internal' }).click()
  await page.getByRole('button', { name: 'Bench' }).click()
  await page.getByRole('option', { name: 'Company-wide Meeting' }).click()
  await page.getByRole('button', { name: 'Save row' }).click()

  // await page
  //   .getByRole('row', {
  //     name: 'AEQ Internal ( AEQ ) Company-wide Meeting Hours on Monday, 13 November Hours on Tuesday, 14 November Hours on Wednesday, 15 November Hours on Thursday, 16 November Hours on Friday, 17 November Hours on Saturday, 18 November Hours on Sunday, 19 November 0 Delete row',
  //   })
  //   .getByLabel('Hours on Monday, 13 November')
  //   .click()
  // await page
  //   .getByRole('row', {
  //     name: 'AEQ Internal ( AEQ ) Company-wide Meeting Hours on Monday, 13 November Hours on Tuesday, 14 November Hours on Wednesday, 15 November Hours on Thursday, 16 November Hours on Friday, 17 November Hours on Saturday, 18 November Hours on Sunday, 19 November 0 Delete row',
  //   })
  //   .getByLabel('Hours on Monday, 13 November')
  //   .click()
  // await page
  //   .getByRole('row', {
  //     name: 'AEQ Internal ( AEQ ) Company-wide Meeting Hours on Monday, 13 November Hours on Tuesday, 14 November Hours on Wednesday, 15 November Hours on Thursday, 16 November Hours on Friday, 17 November Hours on Saturday, 18 November Hours on Sunday, 19 November 0 Delete row',
  //   })
  //   .getByLabel('Hours on Monday, 13 November')
  //   .fill('1')
  // await page
  //   .getByRole('row', {
  //     name: 'AEQ Internal ( AEQ ) Company-wide Meeting Hours on Monday, 13 November Hours on Tuesday, 14 November Hours on Wednesday, 15 November Hours on Thursday, 16 November Hours on Friday, 17 November Hours on Saturday, 18 November Hours on Sunday, 19 November 0 Delete row',
  //   })
  //   .getByLabel('Delete row')
  //   .click()
  // await page.getByRole('button', { name: 'Confirm delete' }).click()
  // await page
  //   .getByRole('row', {
  //     name: 'AEQ Time Off ( AEQ ) Paid Sick Hours on Monday, 13 November Hours on Tuesday, 14 November Hours on Wednesday, 15 November Hours on Thursday, 16 November Hours on Friday, 17 November Hours on Saturday, 18 November Hours on Sunday, 19 November 0 Delete row',
  //   })
  //   .getByLabel('Delete row')
  //   .click()
  // await page
  //   .getByRole('row', {
  //     name: 'AEQ Time Off ( AEQ ) Paid Time Off Hours on Monday, 13 November Hours on Tuesday, 14 November Hours on Wednesday, 15 November Hours on Thursday, 16 November Hours on Friday, 17 November Hours on Saturday, 18 November Hours on Sunday, 19 November 0 Delete row',
  //   })
  //   .getByLabel('Delete row')
  //   .click()
  // await page
  //   .getByRole('row', {
  //     name: 'AEQ Time Off ( AEQ ) Statutory Holiday Hours on Monday, 13 November Hours on Tuesday, 14 November Hours on Wednesday, 15 November Hours on Thursday, 16 November Hours on Friday, 17 November Hours on Saturday, 18 November Hours on Sunday, 19 November 0 Delete row',
  //   })
  //   .getByLabel('Delete row')
  //   .click()
  // await page.getByRole('button', { name: 'Add row' }).click()
  // await page.getByRole('button', { name: 'NINTENDO [NINTENDO] Consultant Support Services' }).press('Escape')
}
