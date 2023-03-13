import { humanizeDelta } from '../../helpers/humanizeDelta'
import { Message } from 'discord.js'
import { sendMessage, upSince } from '../..'

export const uptime = (ctx: Message) => {
  const diff = Date.now() - upSince

  sendMessage(ctx.channel.id, humanizeDelta(diff))
}
