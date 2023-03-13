import { Message } from 'discord.js'
import { sendMessage } from '../..'

export const echo = (ctx: Message) => {
  const { content, channel } = ctx

  const reply = content.replace(/^!echo ?/, '')

  if (!reply) {
    return
  }
  sendMessage(channel.id, reply)
}
