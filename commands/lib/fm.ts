import { Message } from 'discord.js'
import { config } from '../../config'
import fetch from 'node-fetch'
import { sendMessage } from '../..'
import sqlite3 from 'sqlite3'

const getLastFmName = async (username: string): Promise<string | null> => {
    return new Promise((resolve) => {
        const db = new sqlite3.Database('./tokens.db')
        db.get(
            `SELECT * FROM lastfm WHERE username=$username`,
            { $username: username }, (err: any, row: any) => {
                if (row) {
                    resolve(row.lastfmname)
                    return
                }
                resolve(null)
            })
    })
}

export const fm = async (msg: Message) => {
    //
    const { author, channel } = msg

    const [, msgUser] = msg.content.split(' ')

    const lastFmName = await getLastFmName(author.id)
    const user = lastFmName || msgUser || msg.author.username

    if (!user) {
        return
    }

    const res = await fetch(`http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${user}&api_key=${config.lastFMKey}&format=json`)
    const body = await res.json()

    if (body?.recenttracks?.track) {
        const [mostRecent] = body.recenttracks.track

        if (!mostRecent) {
            sendMessage(channel.id, "Nothing is playin'");
            return
        }

        const name = mostRecent.name
        const url = mostRecent.url
        const album = mostRecent.album['#text']
        const artist = mostRecent.artist['#text']

        const reply = `🎵 ${user}: ${artist} — ${name} [${album}] | ${url}`

        sendMessage(channel.id, reply);
    }

}