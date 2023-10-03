import { ActionContext } from './actionContext'

export type Action<ReturnType> = {
  name: string
  isHeadless: boolean
  run: (context: ActionContext) => Promise<ReturnType>
}
