import { test } from '@playwright/test'

test('get Price of tesla3', async ({ page }) => {
  await page.goto('https://www.bing.com/')
  await page.getByRole('button', { name: 'Accept' }).click()
  await page.getByPlaceholder('Search the web').click()
  await page.getByPlaceholder('Search the web').fill('tesla model 3 price')
  await page.getByPlaceholder('Search the web').press('Enter')

  // await page
  //   .getByRole('link', { name: /Tesla Model 3/i })
  //   .first()
  //   .click()
  // const value = await page.locator('.priceMileageRow .price')

  // console.log(value.textContent())
})
