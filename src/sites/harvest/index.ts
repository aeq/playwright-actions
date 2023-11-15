import * as LoginCommands from './login'
import * as TimeCommands from './time'

export const Harvest = {
  ...LoginCommands,
  ...TimeCommands,
}
