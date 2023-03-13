import { Message } from 'discord.js'
import { sendMessage } from '../..'

const msgHistory: Record<string, string[]> = {}

export const sed = (ctx: Message) => {
  const { content, channel } = ctx

  const msgIsSed = content.match(/^ss\/+(.+)+\/+(.+)/)

  if (!msgIsSed) {
    if (ctx.author.username === 'vdk') {
      return
    }
    msgHistory[channel.id] = msgHistory[channel.id] || []

    msgHistory[channel.id].push(content)

    if (msgHistory[channel.id].length > 50) {
      msgHistory[channel.id] = msgHistory[channel.id].slice(-50)
    }
    return
  }

  const [_, s, r] = msgIsSed

  const arr = (msgHistory[channel.id] || []).reverse()
  //console.log(s, r)
  for (const msg of arr) {
    //console.log(msg)
    const match = msg.match(new RegExp(s))
    //console.log(match)

    if (match) {
      const newMsg = msg.replace(s, r)
      sendMessage(channel.id, newMsg)
      break
    }
  }
  // console.log(msgIsSed)
}
