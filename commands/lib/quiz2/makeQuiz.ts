import { addWord } from './quizDb'
import { getQuizChannel } from '../../../registerChannels'
import { DMChannel, Message } from 'discord.js'
import { sendMessage } from '../../..'

export const makeQuiz = (msg: Message) => {
  const { channel, content, author } = msg

  const isPrivate = channel instanceof DMChannel

  if (!isPrivate) {
    sendMessage(channel.id, 'Command available only in private message. Usage - "!quiz.make word:definition')
    return
  }

  const msgText = content.replace(/!quiz.make /, '')

  const [word, definition] = msgText.split(':')

  let trimmedWord = word.replace(/(^ )| $/g, '')
  if (trimmedWord && definition) {
    addWord(trimmedWord, definition)
  }

  sendMessage(channel.id, 'Quiz created!')

  const quizChannels = getQuizChannel()

  quizChannels.forEach((id) => {
    sendMessage(id, `New quiz added by ${author.username}: "${definition}"!`)
  })
}
