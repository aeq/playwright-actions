import { Page } from 'playwright'

type ContactFormData = {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  company?: string
  message?: string
}

export const fillContactForm = async (page: Page, data: ContactFormData) => {
  const { firstName, lastName, email, phone, company, message } = data

  await page.goto('https://aequilibrium.com/')
  await page.getByRole('link', { name: 'Contact Us' }).click()
  firstName && (await page.frameLocator('iframe[title="Form 0"]').getByLabel('First name*').fill(firstName))
  lastName && (await page.frameLocator('iframe[title="Form 0"]').getByLabel('Last name').fill(lastName))
  email && (await page.frameLocator('iframe[title="Form 0"]').getByLabel('Email*').fill(email))
  phone && (await page.frameLocator('iframe[title="Form 0"]').getByLabel('Phone number').fill(phone))
  company && (await page.frameLocator('iframe[title="Form 0"]').getByLabel('Company name*').fill(company))
  message && (await page.frameLocator('iframe[title="Form 0"]').getByLabel('Message*').fill(message))
}

export const submitContactForm = async (page: Page) => {
  // await page.frameLocator('iframe[title="Form 0"]').getByRole('button', { name: 'Submit' }).click();
}
