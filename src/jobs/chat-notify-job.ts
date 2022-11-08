import { EmbedBuilder } from 'discord.js';
import cron from 'node-cron'
import { GiphyService } from '../utils/giphy';
import { getTimeLeft } from '../utils/major-date';

export class ChatNotifyJob {
  private client: any
  private giphy_service: GiphyService

  constructor(client: any, giphy_service: GiphyService) {
    this.client = client
    this.giphy_service = giphy_service
  }

  public start() {
    console.log('Today job started.')

    // Send message in chat every day at 11:30
    cron.schedule('30 11 * * *', () => {
      const giphy_service = this.giphy_service
      const client = this.client

      async function execute() {
        const chat_id = process.env.CHAT_ID

        const timeFormatted = getTimeLeft()

        const distance = timeFormatted.includes('0 dia') ? `${timeFormatted}...` : `Faltam ${timeFormatted}.`
        const randomGif = await giphy_service.getRandom(timeFormatted.includes('0 dia'))
        const gift = new EmbedBuilder({
          image: {
            url: randomGif
          }
        })
          .setTitle('#IEM Major Rio 2022')
          .setDescription(distance)
          .setColor('#030303')

        const chat = client.channels.cache.get(chat_id)

        chat.send({
          embeds: [gift],
          content: '@everyone'
        }).then((msg: any) => {
          // Delete message after 3 hours
          const tree_hours = 3 * 60 * 60 * 1000

          setTimeout(() => {
            try {
              msg.delete()
            } catch (error) {
              console.error(error)
            }
          }, tree_hours)
        }).catch((err: any) => console.error(err))
      }

      execute()
    }, {
      timezone: "America/Sao_Paulo"
    });
  }
}
