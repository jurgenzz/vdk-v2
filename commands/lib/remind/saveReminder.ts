import { getReminders } from './getReminders'
import sqlite3 from 'sqlite3'

export const saveReminders = async (
  guild: string,
  channel: string,
  time: string,
  message: string,
  text: string,
  ts: number
) => {
  const db = new sqlite3.Database('./tokens.db')

  db.run(
    `INSERT INTO reminders 
    (
      guild, channel, time, message, text, ts
    ) 
    VALUES 
    (
        ?, ?, ?, ?, ?, ?
    )`,
    [guild, channel, time, message, text, ts]
  )

  // get last id

  // return

  db.run(`SELECT * FROM reminders ORDER BY id DESC LIMIT 1`, function (err: any, rows: any[] = []) {
    //const [lastRow] = rows
    const id = this.lastID
    const reminders = getReminders()
    reminders.set(id, {
      guild,
      channel,
      time,
      message,
      id,
      text,
      ts,
    })

    db.close()
  })
}
