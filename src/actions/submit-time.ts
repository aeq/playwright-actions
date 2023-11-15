import { ActionContext } from '../types'
import { Harvest } from '../sites/harvest'

export default {
  isHeadless: false,

  run: async ({ page }: ActionContext) => {
    console.log('Begin Submit Time')
    await Harvest.loginWithGoogle(page, {
      username: process.env.GOOGLE_USERNAME || '',
      password: process.env.GOOLE_PASSWORD || '',
    })

    await page.goto('https://aeq.harvestapp.com/time/week')
    await Harvest.resetAllRows(page)
    const rowName = 'some row'
    await Harvest.addRow(page, rowName)
    await Harvest.fillRow(page, { row: rowName, values: [1, 2, 3, 4, 5, 0, 0] })
    await Harvest.submitTime(page)
  },
}
