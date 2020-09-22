import {
  LoadPlaylist,
  LoadPlaylistParams
} from '../../../domain/usecases/music/load-playlist'
import { LoadPlaylistRepository } from '../../../data/protocols/db/music/load-playlist-repository'
import { CurrentTemperatureRepository } from '../../../data/protocols/db/weather/current-temperature-repository'

export class DbLoadPlaylist implements LoadPlaylist {
  constructor (
    private readonly loadPlaylistRepository: LoadPlaylistRepository,
    private readonly currentTemperatureRepository: CurrentTemperatureRepository
  ) {}

  async load (data: LoadPlaylistParams): Promise<string[]> {
    const { cityName, lat, lon, accessToken } = data
    const temperature = await this.currentTemperatureRepository.loadTemperature(
      {
        cityName,
        lat,
        lon
      }
    )
    const celsiusTemperature = temperature - 273.15
    let category: string
    if (celsiusTemperature < 10) {
      category = 'classic'
    } else if (celsiusTemperature >= 10 && temperature <= 14) {
      category = 'rock'
    } else if (celsiusTemperature >= 15 && temperature <= 30) {
      category = 'pop'
    } else if (celsiusTemperature > 30) {
      category = 'party'
    }
    const playlist = await this.loadPlaylistRepository.loadPlaylistByCategory({
      accessToken: accessToken,
      category
    })
    return playlist
  }
}
