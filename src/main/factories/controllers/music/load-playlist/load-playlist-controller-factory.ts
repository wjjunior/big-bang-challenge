import { Controller } from '../../../../../presentation/protocols'
import { LoadPlaylistController } from '../../../../../presentation/controllers/music/load-playlist/load-playlist-controller'
import { DbLoadPlaylist } from '../../../../../data/usecases/load-playlist/db-load-playlist'
import { MusicRepository } from '../../../../../infra/db/spotify/music-repository'

export const makeLoadPlaylistController = (): Controller => {
  const musicRepository = new MusicRepository()
  const dbLoadPlaylist = new DbLoadPlaylist(musicRepository)
  return new LoadPlaylistController(dbLoadPlaylist)
}
