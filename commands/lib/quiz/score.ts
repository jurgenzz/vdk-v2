import { scores } from './quizDb'
import { sendMessage } from '../../..'
import { Message } from 'discord.js'

export const score = (msg: Message) => {
  const { channel, author } = msg
  sendMessage(channel.id, `Current score: ${scores.get(author.username) || 0}.`)
}
