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

    const distance = `Faltam ${timeFormatted}.`
    const randomGif = await this.giphy_service.getRandom()
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
    }).catch(() => null)
  }
}
