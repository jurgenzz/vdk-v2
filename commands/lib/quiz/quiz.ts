import { Message } from 'discord.js'
import { sendMessage } from '../../..'
import { words } from './quizDb'

export const quiz = (msg: Message) => {
  const { channel } = msg

  let reply = [...words.values()].map((def, i) => `${i + 1}: ${def}`).join(';\n') || `No active quiz at the moment`

  sendMessage(channel.id, reply)
}
