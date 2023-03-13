import { Message } from 'discord.js'
import fetch from 'node-fetch'
import { sendMessage } from '../..'

const rowsRegex = /<tr>\n+.+<td>(<.+?>)?([A-Ž0-9]+|[A-Ž]+ [A-Ž]+)<.+?>+\n+.+<td>([0-9]+)<\/td>/gm
const tdRegex = /<td>(<.+?>)?([A-Ž0-9]+|[A-Ž]+ [A-Ž]+)<.+?>/gm
export const count = async (ctx: Message) => {
  const { content, channel } = ctx

  let query = content.replace(/!count ?/, '')

  if (!query) {
    return
  }

  query = encodeURIComponent(query)

  const url = `https://personvardi.pmlp.gov.lv/index.php?name=${query}`

  const res = await fetch(url)

  const data = (await res.text()).replace(/\r/g, '')

  let rows = data.match(rowsRegex)

  const results: string[] = []

  for (let i = 0; i < 3; i++) {
    const row = rows && rows[i]
    if (!row) {
      break
    }
    const [nameMatch, countMatch] = row.match(tdRegex) || []
    const [name] = nameMatch.match(/>[A-Ž]+ [A-Ž]+|>[A-Ž]+/) || []
    const [count] = countMatch.match(/[0-9]+/) || []

    const formattedName = name
      .slice(1)
      .toLowerCase()
      .split(' ')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ')

    results.push(`${formattedName}[${count}]`)
  }

  if (results.length) {
    sendMessage(
      channel.id,
      `PMPL stāsta, ka Latvijā ir apmēram šādi - ${results.join(', ')}. http://vd.jurg.is/n?q=${query}`
    )
  } else {
    sendMessage(channel.id, `PMLP saka, ka nav ar šādu vārdu neviens.`)
  }
}
