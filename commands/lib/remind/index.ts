import { stringToSeconds, hypheniphyDate, humanizeDelta } from '../../../helpers/humanizeDelta'
import { saveReminders } from './saveReminder'
import { getReminders } from './getReminders'
import { Message } from 'discord.js'
import { sendMessage } from '../../..'

export const remind = async (ctx: Message) => {
  const { content, author, channel, guild } = ctx

  const hasContent = content.replace(/^!remind ?/, '').replace(/s+/, '')

  if (!hasContent) {
    const reminders: string[] = []

    getReminders().forEach((item) => {
      reminders.push(`* ${item.text} - ${humanizeDelta(item.ts - Date.now())}`)
    })

    sendMessage(channel.id, reminders.join('\n'))
  }

  const userId = author.id

  const [, timeStamp] = content.split(' ') // returns 7d4h, 7d, 1d, 2w,

  const msg = content
    .replace(/^!remind /, '')
    .replace(timeStamp, '')
    .replace(/\s+/, '')

  if (!timeStamp || !msg) {
    return
  }

  const seconds = stringToSeconds(timeStamp)
  const reminderTs = Date.now() + seconds * 1000

  await saveReminders(
    guild.id,
    channel.id,
    hypheniphyDate(new Date(reminderTs)),
    `<@${userId}>, a reminder for you - ${msg}`,
    msg,
    reminderTs
  )

  const willRemindInTs = reminderTs - Date.now()
  const willRemindInDate = humanizeDelta(willRemindInTs)
  sendMessage(channel.id, `Ok <@${userId}>! Will remind you in ${willRemindInDate}! `)
}
