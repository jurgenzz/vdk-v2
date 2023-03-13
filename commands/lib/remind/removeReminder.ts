import { getReminders } from './getReminders'
import sqlite3 from 'sqlite3'

export const removeReminder = async (id: number) => {
  const reminders = getReminders()
  reminders.delete(id)

  const db = new sqlite3.Database('./tokens.db')
  db.run(`DELETE FROM reminders WHERE id=$id`, { $id: id })
  db.close()
}
