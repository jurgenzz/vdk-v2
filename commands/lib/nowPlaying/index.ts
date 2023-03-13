import { getSpotifyTokens } from './spotifyTokens'
import { getCurrenyPlayingSong } from './getCurrentPlayingSong'
import { getNpChannel } from '../../../registerChannels'
import { Message } from 'discord.js'
import { sendMessage } from '../../..'

export const nowPlayingHere = async (ctx: Message) => {
  await nowPlaying(ctx, true)
}

export const nowPlaying = async (ctx: Message, replySameChannel: boolean) => {
  const { author, content, guild, channel } = ctx

  const username = content.replace(/^!spotify( ?| ?)/, '') || author.username

  const newChannelId = !replySameChannel && guild.id && getNpChannel(guild.id)

  if (!username) {
    return
  }

  const { access_token, refresh_token } = (await getSpotifyTokens(username)) || {}

  if (!access_token || !refresh_token) {
    return
  }

  let res = await getCurrenyPlayingSong(access_token, refresh_token, username)

  if (!res) {
    // unknown or not playing anything
    sendMessage(channel.id, "Nothing is playin'")
    return
  }

  if (res.is_playing) {
    // prettier-ignore
    const msg = `🎵 ${username}: ${res.item.artists.map((a: any) => a.name).join(", ")} — ${res.item.name} [${res.item.album.name}] | ${res.item.external_urls.spotify}`

    sendMessage(newChannelId || channel.id, msg)
  }
}
