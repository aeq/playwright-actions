import * as SearchCommands from './search'
import * as LoginCommands from './login'

export const Google = {
  ...SearchCommands,
  ...LoginCommands,
}

export * from './types'
