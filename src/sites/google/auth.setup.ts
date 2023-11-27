import { test as setup, expect } from '@playwright/test'
import { Google } from '.'

const authFile = 'playwright/.auth/user.json'

setup('authenticate', async ({ page }) => {
  await page.goto('https://www.google.ca/')
  await page.getByRole('link', { name: 'Sign in' }).click()
  // Perform authentication steps. Replace these actions with your own.
  await Google.login(page, {
    username: process.env.GOOGLE_USERNAME || '',
    password: process.env.GOOLE_PASSWORD || '',
  })

  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  await page.waitForURL('https://www.google.ca/')
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  await expect(page.getByRole('button', { name: "I'm Feeling Lucky" })).toBeVisible()

  // End of authentication steps.
  await page.context().storageState({ path: authFile })

  console.log('Authentication completed. Cookies are saved!')
})
