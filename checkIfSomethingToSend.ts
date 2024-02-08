import { hypheniphyDate } from './helpers/humanizeDelta'
import { getReminders } from './commands/lib/remind/getReminders'
import { removeReminder } from './commands/lib/remind/removeReminder'
import { vd } from './commands/lib/vd/index'
import { sendMessage } from '.'

let vdSent = false
export const checkIfSomethingToSend = () => {
  const currentDate = hypheniphyDate(new Date())

  // check reminders
  const reminders = getReminders()
  reminders.forEach((reminder) => {
    if (reminder.time === currentDate) {
      sendMessage(reminder.channel, reminder.message)
      removeReminder(reminder.id)
    }
  })

  // check if we need to post !vd

  const d = new Date()
  const h = d.getHours()
  const m = d.getMinutes()
  const s = d.getSeconds()

  const time = `${h}:${m}:${s}`

  if (time === '10:0:0') {
    if (!vdSent) {
      vd()
      vdSent = true

      setTimeout(() => {
        vdSent = false
      }, 1500)
    }
  }
}
