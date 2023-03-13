import { words, deleteWord } from './quizDb'
import { sendMessage } from '../../..'
import { Message } from 'discord.js'

export const gibap = (msg: Message) => {
  const { content, author, channel } = msg

  const gibap = content.replace(/!quiz.gibap /, '')

  const isRight = words.get(gibap)

  if (isRight) {
    sendMessage(channel.id, `No one guessed <@${author.id}>'s quiz: "${gibap}" - ${isRight}`)
    deleteWord(gibap, author.username)
  } else {
    sendMessage(channel.id, 'Whoops, no active quiz has this word as an answer')
  }
}
