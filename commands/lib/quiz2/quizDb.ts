import sqlite3 from 'sqlite3'

const db = new sqlite3.Database('./tokens.db')

export const words = new Map<string, string>([])

export const scores = new Map<string, number>([])

export const deleteWord = async (word: string, username: string) => {
  const definition = words.get(word)
  words.delete(word)

  db.run(`INSERT INTO quizHistory(username, word, definition) VALUES(?,?,?)`, [username, word, definition])

  db.run('DELETE FROM quiz WHERE word=$word', { $word: word })
}

export const addWord = async (word: string, definition: string) => {
  words.set(word, definition)

  db.run(`INSERT INTO quiz(word, definition) VALUES(?,?)`, [word, definition])
}

export const updateScore = async (username: string, score: number) => {
  scores.set(username, score)

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
