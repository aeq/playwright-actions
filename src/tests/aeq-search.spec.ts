import { test } from '@playwright/test'

test('can fill AEQ form', async ({ page }) => {
  await page.goto('https://www.google.ca/')
  await page.getByRole('combobox', { name: 'Search' }).fill('aequilibrium')
  await page.getByLabel('Google Search').first().click()
  await page.getByRole('link', { name: 'Aequilibrium aequilibrium.com https://aequilibrium.com' }).click()
  await page.getByRole('link', { name: 'Work' }).click()
  await page.getByRole('link', { name: 'Contact Us' }).click()
  await page.getByPlaceholder('Name').fill('Some Name')
  await page.getByPlaceholder('Company').fill('AEQ is awesome')
  await page.getByPlaceholder('Phone Number').fill('555555555')
  await page.getByPlaceholder('Email').fill('testing@aequilibrium.ca')
  await page.getByPlaceholder('Leave a message').fill('Just testing!')
})
