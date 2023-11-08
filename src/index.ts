import * as playwright from 'playwright'
import yargs from 'yargs'
import { getActions } from './actions'
import { Action, ActionContext } from './types'

///////////////////// HELPER FUNCTIONS /////////////////////

const showHelp = (actions: Record<string, Action<unknown>>) => {
  console.log('=== HELP ===')
  console.log('npm run action [action] -- --[v|verbse] --[b|browser] ...')
  console.log('Supported Actions:')
  Object.keys(actions).forEach((name) => console.log(`   - ${name}`))
}

////////////////////// MAIN /////////////////////////
const main = async () => {
  ////////////////////// ARGUMENTS /////////////////////////
  const argv = await yargs(process.argv.slice(2)).options({
    v: { type: 'boolean', alias: 'verbose', default: false },
    b: { type: 'boolean', alias: 'browser', default: false },
  }).argv

  const actions = await getActions()

  const actionName = argv._[0]
  if (!actions[actionName]) {
    console.error('Error: Invalid action')
    showHelp(actions)
    process.exit(1)
  }

  console.log(`Running action '${actionName}'`)
  const action = actions[actionName]
  const headless = action.isHeadless || !argv.b
  const browser = await playwright.chromium.launch({
    headless,
  })
  const context = await browser.newContext({
    recordVideo: {
      dir: 'videos/',
      size: { width: 640, height: 480 },
    },
  })
  const page = await context.newPage()
  const actionContext: ActionContext = { argv, browser, context, headless, page }

  try {
    await action.run(actionContext)

    if (!headless) {
      console.log('Keep browser open.')

      // Wait until the browser is closed.
      await new Promise((resolve) => {
        page.on('close', resolve)
      })
    }
  } catch (ex) {
    console.error('Unhandled exception:')
    console.error(ex)
  } finally {
    await page.close()
    await context.close()
    await browser.close()
  }
  console.log('Video of browser actions: ', await page.video()?.path())
  console.log('Finished!')
}

main()
