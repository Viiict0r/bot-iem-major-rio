import { ActivityType, Client, GatewayIntentBits } from 'discord.js'
import { config } from 'dotenv'

config()

import './commands/register'
import { MajorCommand } from './commands/major-command'
import { getTimeLeft } from './utils/major-date'
import { GiphyService } from './utils/giphy'

const TOKEN = process.env.BOT_TOKEN
const client = new Client({ intents: [ GatewayIntentBits.Guilds ] })
const giphy_service = new GiphyService()

client.once('ready', () => {
  console.log('Bot initialized.')

  client.user?.setPresence({
    status: 'online',
    activities: [
      {
        name: getTimeLeft(),
        type: ActivityType.Playing,
      }
    ]
  })

  setInterval(() => {
    client.user?.setPresence({
      status: 'online',
      activities: [
        {
          name: getTimeLeft(),
          type: ActivityType.Playing,
        }
      ]
    })
  }, 60 * 1000) // Update presence every 1 minute
})

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return

  switch(interaction.commandName) {
    case 'major':
      await new MajorCommand(giphy_service).execute(interaction)
    default:
      break
  }
})

client.login(TOKEN)
