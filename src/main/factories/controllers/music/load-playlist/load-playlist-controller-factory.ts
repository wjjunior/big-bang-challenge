import { Controller } from '../../../../../presentation/protocols'
import { LoadPlaylistController } from '../../../../../presentation/controllers/music/load-playlist/load-playlist-controller'
import { DbLoadPlaylist } from '../../../../../data/usecases/load-playlist/db-load-playlist'
import { MusicRepository } from '../../../../../infra/db/spotify/music-repository'
import { WeatherRepository } from '../../../../../infra/db/open-weather/weather-repository'

export const makeLoadPlaylistController = (): Controller => {
  const musicRepository = new MusicRepository()
  const weatherRepository = new WeatherRepository()
  const dbLoadPlaylist = new DbLoadPlaylist(musicRepository, weatherRepository)
  return new LoadPlaylistController(dbLoadPlaylist)
}
