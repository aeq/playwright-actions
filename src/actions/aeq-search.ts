import { expect } from 'playwright/test'
import { ActionContext } from '../types'
import { Aequilibrium, Google } from '../sites'

export default {
  isHeadless: false,

  run: async ({ page }: ActionContext) => {
    console.log('Begin AEQ Search example')
    await Google.search(page, 'aequilibrium')
    await page.getByRole('link', { name: /https:\/\/aequilibrium.com/i }).click()

    const formData = {
      firstName: 'Some',
      lastName: 'Name',
      company: 'AEQ',
      email: 'some.name@aeq.com',
    }
    await Aequilibrium.fillContactForm(page, formData)
    await Aequilibrium.submitContactForm(page)

    expect(await page.getByText('Your submission was successful.')).toBeTruthy()
  },
}
