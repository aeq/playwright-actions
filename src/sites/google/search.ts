import { Page } from 'playwright'

export const search = async (page: Page, query: string) => {
  await page.goto('https://www.google.ca/')
  await page.getByRole('combobox', { name: 'Search' }).fill(query)
  await page.getByLabel('Google Search').first().click()
}
