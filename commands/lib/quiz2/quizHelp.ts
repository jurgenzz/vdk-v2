import { Message } from 'discord.js'
import { sendMessage } from '../../..'
import { words } from './quizDb'

export const quizHelp = (msg: Message) => {
  const { content, author, channel } = msg

  const reply =
    'Commands: `!quiz.list`, `!quiz.make word:definition`, `!quiz.guess word`, `!quiz.gibap word`, `!quiz.score`, `!quiz.top`'
  sendMessage(channel.id, reply)
}
