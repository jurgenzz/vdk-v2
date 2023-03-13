import sqlite3 from 'sqlite3'

export const getSpotifyTokens = async (
  username: string
): Promise<{ access_token: string; refresh_token: string } | null> => {
  const db = new sqlite3.Database('./tokens.db')

  return new Promise((resolve) => {
    db.get(
      `SELECT access_token, refresh_token FROM tokens WHERE username=$username`,
      {
        $username: username,
      },
      (err: any, user: any) => {
        db.close()

        if (!user) {
          resolve(null)
          return;
        }

        const { access_token, refresh_token } = user

        resolve({
          access_token,
          refresh_token,
        })
      }
    )
  })
}
