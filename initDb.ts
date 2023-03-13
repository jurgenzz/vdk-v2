import { getReminders } from './commands/lib/remind/getReminders'
import { scores, words } from './commands/lib/quiz/quizDb'
import sqlite3 from 'sqlite3'

export const initDb = async () => {
  const db = new sqlite3.Database('./tokens.db')

  db.run(
    `
        CREATE TABLE IF NOT EXISTS reminders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            guild TEXT,
            channel TEXT,
            time TEXT,
            message TEXT,
            text TEXT,
            ts INTEGER
        )
    `,
    []
  )

  db.run(
    `CREATE TABLE IF NOT EXISTS tokens (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT,
            access_token TEXT,
            refresh_token TEXT
        )`,
    []
  )

  db.run(
    `CREATE TABLE IF NOT EXISTS awards (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT,
            score INTEGER
        )`,
    []
  )

  db.run(
    `CREATE TABLE IF NOT EXISTS quiz (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            word TEXT,
            definition TEXT
        )`,
    []
  )

  db.run(
    `CREATE TABLE IF NOT EXISTS quizHistory (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            word TEXT,
            definition TEXT,
            username TEXT
        )`,
    []
  )
  db.run(
    `CREATE TABLE IF NOT EXISTS lastfm (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT,
            lastfmname TEXT
        )`,
    []
  )

  db.all(`SELECT * FROM reminders`, (err: any, reminders: any[] = []) => {
    reminders.forEach(({ id, guild, channel, time, message, text, ts }: any) => {
      const remindersMap = getReminders()
      remindersMap.set(id, {
        guild,
        channel,
        time,
        message,
        id,
        text,
        ts,
      })
    })
  })

  db.all(`SELECT * FROM awards`, (err: any, awards: any[] = []) => {
    awards.forEach(({ username, score }: any) => {
      scores.set(username, score)
    })
  })

  db.all(`SELECT * FROM quiz`, {}, (err: any, quizes: any[] = []) => {
    quizes.forEach(({ word, definition }: any) => {
      words.set(word, definition)
    })
  })

  db.close()
}

initDb()
