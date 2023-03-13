import { formatDate } from '../../../helpers/formatDate'
import { formatDateFromStr } from '../../../helpers/formatDateFromStr'
import { lookupNames } from './lookupNames'
import { getNameDayByDate } from './getNameByDate'
import { getGeneralChannels } from '../../../registerChannels'
import { Message } from 'discord.js'
import { sendMessage } from '../../..'

export const vd = (ctx?: Message) => {
  const { content } = ctx || {}

  const msg = content && content.replace(/^!vd ?/, '')
  let date = formatDate()
  let dateFromMsg
  if (msg && ctx) {
    dateFromMsg = formatDateFromStr(msg)

    if (typeof dateFromMsg === 'object') {
      date = dateFromMsg
    } else {
      return sendMessage(ctx.channel.id, lookupNames(msg))
    }
  }

  let reply = getNameDayByDate(date)

  if (!reply) {
    return
  }

  if (ctx) {
    sendMessage(ctx.channel.id, `${reply}.`)
  } else {
    const generalChannels = getGeneralChannels()
    generalChannels.forEach((channel) => {
      sendMessage(channel, `${reply}.`)
    })
  }
}
