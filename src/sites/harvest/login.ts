import { Page } from 'playwright'
import { Google, GoogleCredentials } from '../google'

export type LoginMethod = 'password' | 'sso'

export const loginWithGoogle = async (page: Page, credentials: GoogleCredentials) => {
  await page.goto('https://id.getharvest.com/harvest/sign_in')
  await page.getByRole('link', { name: 'Sign in with Google' }).click()
  await Google.login(page, credentials)
  await page.waitForURL('https://aeq.harvestapp.com/time/week')
}
