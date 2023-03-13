import sqlite from 'sqlite3'

export const words = new Map<string, string>([])

export const scores = new Map<string, number>([])

export const deleteWord = async (word: string, username: string) => {
  const definition = words.get(word)
  words.delete(word)

  const db = new sqlite.Database('./tokens.db')

  db.run(`INSERT INTO quizHistory(username, word, definition) VALUES(?,?,?)`, [username, word, definition])

  db.run('DELETE FROM quiz WHERE word=$word', { $word: word })
}

export const addWord = async (word: string, definition: string) => {
  words.set(word, definition)

  const db = new sqlite.Database('./tokens.db')

  db.run(`INSERT INTO quiz(word, definition) VALUES(?,?)`, [word, definition])
}

export const updateScore = async (username: string, score: number) => {
  scores.set(username, score)

  const db = new sqlite.Database('./tokens.db')
  db.run(`
        INSERT OR REPLACE INTO 
            awards(id, username, score) 
        VALUES(
            (SELECT id FROM 
                    awards 
                WHERE 
                    username = '${username}'
            ),
            '${username}',
            '${score}')`)
}

export const getLast30 = (): Promise<any[]> => {
  const db = new sqlite.Database('./tokens.db')

  return new Promise((resolve) => {
    db.all(
      `
      SELECT word FROM quizHistory 
      ORDER BY
        id DESC
      LIMIT 10
    `,
      (err: any, words: any[] = []) => {
        resolve(words)
      }
    )
  })
}
