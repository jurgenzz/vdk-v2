import { config } from '../../../config'
import { addWord, getLast30 } from './quizDb'
import { getQuizChannel } from '../../../registerChannels'
import { sendMessage } from '../../..'
import { Message } from 'discord.js'
import fetch from 'node-fetch'
const pickRandom = (arr: any[]): [word: string, definition: string] => {
  return arr[Math.floor(Math.random() * arr.length)]
}

export const quizNew = async ({ author, content }: Message) => {
  const index = content.replace(/!quiz.new /, '')

  const hasIndex = !isNaN(+index)

  const res = await fetch(`http://quiz.fair.lv`, {
    headers: {
      Authorization: `Basic ${Buffer.from(config.quiz.username + ':' + config.quiz.password, 'binary').toString(
        'base64'
      )}`,
    },
  })

  const json = await res.json()

  const getWord = async (): Promise<[word: string, definition: string]> => {
    const item = pickRandom(json)

    const last30 = await getLast30()
    if (last30.indexOf(item[0]) === -1) {
      return item
    }
    return getWord()
  }

  const [word, definition] = (hasIndex ? json[index] : await getWord()) || []

  const quizChannels = getQuizChannel()

  if (hasIndex && !word) {
    quizChannels.forEach((id) => {
      sendMessage(id, `Index is out of bounds :)`)
    })
    return
  }

  // todo check if word exists?
  let trimmedWord = word.replace(/(^ )| $/g, '')
  if (trimmedWord && definition) {
    addWord(trimmedWord, definition)
  }

  quizChannels.forEach((id) => {
    sendMessage(id, `New auto quiz added by ${author.username}: "${definition}"!`)
  })
}
