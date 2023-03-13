import { Message, TextChannel } from 'discord.js'
import { client, sendMessage } from '../../index'

export const ping = async (ctx: Message) => {
  sendMessage(ctx.channel.id, 'pong')
}
