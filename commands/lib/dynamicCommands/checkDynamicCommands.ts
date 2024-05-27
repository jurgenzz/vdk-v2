import { Message } from 'discord.js'
import { sendMessage } from '../../..'
import { config } from '../../../config'
import fetch from 'node-fetch'

let cmdCache: Map<string, string> = new Map([])
let needsUpdate = true

export const checkDynamicCommands = async (ctx: Message, cmd: string) => {
  let existingReply = cmdCache.get(cmd)
  if (existingReply) {
    let uiMessage = ctx.content.split(' ').slice(1).join(' ')

    existingReply = existingReply
      .replace(/{urlParam}/, encodeURIComponent(uiMessage))
      .replace(/{param}/, uiMessage)
      .replace(/{nick}/, ctx.author.username)

    sendMessage(ctx.channel.id, existingReply)
    return
  }

  if (needsUpdate) {
    await updateCommands()
    let updated = cmdCache.get(cmd)
    if (updated) {
      let reply = updated
      let uiMessage = ctx.content.split(' ').slice(1).join(' ')

      reply = reply
        .replace(/{urlParam}/, encodeURIComponent(uiMessage))
        .replace(/{param}/, uiMessage)
        .replace(/{nick}/, ctx.author.username)

      sendMessage(ctx.channel.id, reply)
    }
  }
}

export const clearCache = async (ctx: Message, cmd: string) => {
  cmdCache = new Map([])
  needsUpdate = true

  if (!ctx.guild.id) {
    sendMessage(ctx.channel.id, 'Cache cleared')
  }
}

export const updateCommands = async () => {
  try {
    // const res = await fetch(`${config.commandsApi}/api/commands`)
    const res = await fetch(
      'https://gist.githubusercontent.com/jurgenzz/ead4461470368ed0279bca88bbf7de08/raw/1ee1718a88f39367028080034e93059be26d0e1f/commands.json'
    )

    const commandsRe = await res.json()

    Object.entries(commandsRe?.commands).forEach(([key, value]) => {
      cmdCache.set(key, value as string)
    })

    needsUpdate = false
  } catch (err) {
    console.log(err)
  }
}
