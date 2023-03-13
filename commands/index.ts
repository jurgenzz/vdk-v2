import { Message } from 'discord.js'
import { list } from './list'
import { checkDynamicCommands } from './lib/dynamicCommands/checkDynamicCommands'
import { sed } from './lib/sed'

export const resolveCommand = async (ctx: Message) => {
  const { content } = ctx

  const matchCommand = content.match(/^!\w+(\.|-?)\w+/)
  const cmd = matchCommand && matchCommand[0]

  sed(ctx)

  if (!cmd) {
    return
  }

  const action = list.get(cmd)

  if (action) {
    action(ctx)
  } else {
    await checkDynamicCommands(ctx, cmd)
  }
}
