import * as playwright from 'playwright'
import { Argv } from 'yargs'

export interface ActionContext {
  argv: Argv['argv']
  browser: playwright.Browser
  context: playwright.BrowserContext
  headless: boolean
  page: playwright.Page
}
