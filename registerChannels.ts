import { GuildChannel, GuildChannelManager } from 'discord.js'

const npChannels: Map<string, string> = new Map([])
const generalChannels: Map<string, string> = new Map([])
const quizChannels: Map<string, string> = new Map([])
const vdChannels: Map<string, string> = new Map([])

export const registerChannels = (channels: GuildChannelManager, parentId: string) => {
  //   channels.cache.forEach()

  channels.cache.forEach((channel: GuildChannel) => {
    switch (channel.name) {
      case 'np': {
        npChannels.set(parentId, channel.id)
        break
      }

      case 'general': {
        generalChannels.set(channel.id, channel.id)
        break
      }

      case 'quiz': {
        quizChannels.set(channel.id, channel.id)
        break
      }

      case 'vd': {
        vdChannels.set(channel.id, channel.id)
      }
    }
  })
}

export const getNpChannel = (parentId: string) => {
  return npChannels.get(parentId)
}

export const getGeneralChannels = () => {
  return [...generalChannels.values()]
}

export const getQuizChannel = () => {
  return [...quizChannels.values()]
}

export const getVdChannels = () => {
  return [...vdChannels.values()]
}
