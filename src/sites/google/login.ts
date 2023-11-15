import { Page } from 'playwright'
import { GoogleCredentials } from './types'

export const login = async (page: Page, credentials: GoogleCredentials) => {
  const { username, password } = credentials

  // do we need to authenticate?
  const login = page.locator('Email or phone')
  if ((await login.count()) > 0) {
    await page.getByLabel('Email or phone').fill(username)
    await page.getByRole('button', { name: 'Next' }).click()

    // wait for password screeen to show
    await page.waitForSelector('input[type="password"]', { state: 'visible' })
    await page.waitForURL((x) => x.href.includes('https://accounts.google.com/v3/signin/challenge/pwd'))

    await page.getByRole('textbox', { name: 'Enter your password' }).fill(password)

    // const input = page.locator('input[type="password"]')
    // await input.fill(password)

    await page.getByRole('button', { name: 'Next' }).click()
  }
}
