import { ActivityType, Client, GatewayIntentBits } from 'discord.js'
import { config } from 'dotenv'

config()

import './commands/register'
import { MajorCommand } from './commands/major-command'
import { getTimeLeft } from './utils/major-date'
import { GiphyService } from './utils/giphy'
import { ChatNotifyJob } from './jobs/chat-notify-job'

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

  new ChatNotifyJob(client, giphy_service).start()
})

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return

  switch(interaction.commandName) {
    case 'major':
      new MajorCommand(giphy_service).execute(interaction).then(() => null).catch((err) => console.error(err))
    default:
      break
  }
})

client.login(TOKEN)
