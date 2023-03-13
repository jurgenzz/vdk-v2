import { Message, TextChannel } from 'discord.js'
import { client, sendMessage } from '../../index'
import sqlite3 from 'sqlite3'

export const setLastFm = async (ctx: Message) => {
    const { author, content, channel } = ctx

    const lastFmName = content.replace(/^!set-lastfm ?/, '')

    const db = new sqlite3.Database('./tokens.db')
    db.get(
        `SELECT * FROM lastfm WHERE username=$username`,
        {
            $username: author.id,
        },
        (err: any, current: string) => {
            if (current) {
                db.run(`UPDATE lastfm SET lastfmname=$lastFmName WHERE username=$username`, {
                    $lastFmName: lastFmName,
                    $username: author.id,
                })
                sendMessage(channel.id, 'Username updated!')
            } else {
                db.run(`INSERT INTO lastfm(username, lastfmname) VALUES(?,?)`, [author.id, lastFmName])
                sendMessage(channel.id, 'Username set!')
            }
        }
    )
}
