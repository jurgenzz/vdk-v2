import sqlite3 from 'sqlite3'

export const storeToken = (username: string, refresh_token: string, access_token: string) => {
  const db = new sqlite3.Database('./tokens.db')

  db.get(
    `SELECT * FROM tokens WHERE username=$username`,
    {
      $username: username,
    },
    (err: any, user: any) => {
      if (user) {
        db.run(
          `
          UPDATE tokens 
          SET 
            access_token = $access_token, 
            refresh_token = $refresh_token
          WHERE username=$username`,
          {
            $access_token: access_token,
            $username: username,
            $refresh_token: refresh_token,
          }
        )
      } else {
        db.run(
          `
          INSERT INTO tokens(username, refresh_token, access_token) VALUES(?,?,?)
          `,
          [username, refresh_token, access_token]
        )
      }
      db.close()
    }
  )
}
