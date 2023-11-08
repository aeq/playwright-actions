import * as fs from 'fs/promises'
import * as path from 'path'
import { Action } from '../types'

const fileNameToActionName = (name: string) => name.substring(0, name.lastIndexOf('.'))

/**
 * Returns a list of actions, by loading all files in the directory.
 */
export const getActions = async () => {
  const files = await fs.readdir(__dirname)
  console.log({ files })

  return files.reduce(
    (all, f) => {
      const actionName = fileNameToActionName(f)
      // eslint-disable-next-line import/no-dynamic-require, global-require, @typescript-eslint/no-var-requires
      const action = require(path.join(__dirname, f))
      const defaultAction = action.default
      return {
        ...all,
        ...(defaultAction ? { [actionName]: action.default } : {}),
      }
    },
    {} as Record<string, Action<unknown>>
  )
}
