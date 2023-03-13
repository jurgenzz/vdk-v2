import { Message } from 'discord.js'
import { sendMessage } from '../../..'
import { scores } from './quizDb'

export const score = (msg: Message) => {
  const { channel, author } = msg
  sendMessage(channel.id, `Current score: ${scores.get(author.username) || 0}.`)
}
