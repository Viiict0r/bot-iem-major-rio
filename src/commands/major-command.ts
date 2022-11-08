import { CacheType, ChatInputCommandInteraction, AttachmentBuilder, EmbedBuilder } from "discord.js";
import { GiphyService } from "../utils/giphy";
import { getTimeLeft } from '../utils/major-date';

export class MajorCommand {
  private readonly giphy_service

  constructor(giphy_service: GiphyService) {
    this.giphy_service = giphy_service
  }
  public async execute(interaction: ChatInputCommandInteraction<CacheType>) {
    const timeFormatted = getTimeLeft()

    if (timeFormatted === '¯\_(ツ)_/¯') {
      interaction.reply({
        content: ''
      }).then((message: any) => {
        // Delete reply message after 2 minutes
        setTimeout(() => {
          try {
            message.interaction.deleteReply()
          } catch (error) {
            console.error(error)
          }
        }, 120 * 1000)
      }).catch((err) => console.error(err))

      return
    }

    const distance = timeFormatted.includes('0 dia') ? `${timeFormatted}...` : `Faltam ${timeFormatted}.`
    const randomGif = await this.giphy_service.getRandom(timeFormatted.includes('0 dia'))
    const gift = new EmbedBuilder({
      image: {
        url: randomGif
      }
    })
      .setTitle('#IEM Major Rio 2022')
      .setDescription(distance)
      .setColor('#030303')

    interaction.reply({
      embeds: [gift],
    }).then((message: any) => {
      // Delete reply message after 2 minutes
      setTimeout(() => {
        try {
          message.interaction.deleteReply()
        } catch (error) {
          console.error(error)
        }
      }, 120 * 1000)
    }).catch((err) => console.error(err))
  }
}
