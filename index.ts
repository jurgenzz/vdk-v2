import { Client, Intents, TextChannel } from 'discord.js'
import { config } from './config'
import { resolveCommand } from './commands'
import { registerChannels } from './registerChannels'

import './initDb'
import { checkIfSomethingToSend } from './checkIfSomethingToSend'

//@ts-ignore
export const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })

export const upSince = Date.now()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
  client.guilds.cache.forEach((guild) => {
    registerChannels(guild.channels, guild.id)
  })
})

client.on('message', (message) => {
  resolveCommand(message)
})

client.on('guildCreate', (guild) => {
  console.log(guild)
  registerChannels(guild.channels, guild.id)
})

client.login(config.token)

export const sendMessage = async (channelId: string, text: string) => {
  const channel: TextChannel = (await client.channels.fetch(channelId)) as TextChannel
  channel.send(text)
}

setInterval(() => {
  checkIfSomethingToSend()
}, 700)
