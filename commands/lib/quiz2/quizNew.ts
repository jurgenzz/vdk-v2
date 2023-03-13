import { Message } from 'discord.js'
import fetch from 'node-fetch'
import { config } from '../../../config'

export const quizNew = async (msg: Message) => {
  const res = await fetch(`http://quiz.fair.lv`, {
    headers: {
      Authorization: `Basic ${Buffer.from(config.username + ':' + config.password, 'binary').toString('base64')}`,
    },
  })

  const json = await res.json()

  console.log(json)
}
