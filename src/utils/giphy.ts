import axios from 'axios'

export class GiphyService {
  private readonly base_url = 'https://api.giphy.com/v1/gifs/search'
  private readonly api_token = process.env.GIPHY_API_TOKEN
  private readonly rating = 'g'
  private readonly querys = [
    '@mibrteam fallen',
    '@mibrteam boltz',
    '@BLASTPremier furia',
    '@BLASTPremier mibr',
    '@BLASTPremier niko',
    '@BLASTPremier g2',
    '@BLASTPremier fer',
    '@BLASTPremier s1mple',
    '@BLASTPremier navi',
    '@BLASTPremier fallen',
    '@BLASTPremier'
  ]

  private fetched_gifs: string[] = []

  public async getRandom() {
    let final_gif_url = ''

    try {
      const response = await axios.get(this.base_url, {
        params: {
          api_key: this.api_token,
          q: this.getRandomValue(this.querys),
          rating: this.rating
        }
      })

      const data = response.data.data
      const gif = this.getRandomValue(data)

      // https://developers.giphy.com/docs/api/schema/#image-object
      const image = gif.images.downsized.url

      final_gif_url = image

      this.fetched_gifs.push(image)
    } catch (error) {
      console.error(error)
      // Return existing gif
      const random_gif = this.getRandomValue(this.fetched_gifs)

      final_gif_url = random_gif
    }

    return final_gif_url
  }

  private getRandomValue(list: any[]) {
    return list[Math.floor(Math.random()*list.length)]
  }
}
