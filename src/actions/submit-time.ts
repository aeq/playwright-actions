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
    const rows = [
      { project: 'AEQ Internal', task: 'Company-wide Meeting', values: [1, 2, 3] },
      { project: 'AEQ Time Off', task: 'Paid Sick', values: [0, 0, 4, 5] },
      { project: 'AEQ Time Off', task: 'Paid Time Off', values: [0, 0, 0, 0, 0, 8] },
    ]

    await Harvest.addRows(page, rows)
    // await Harvest.submitTime(page)
  },
}
