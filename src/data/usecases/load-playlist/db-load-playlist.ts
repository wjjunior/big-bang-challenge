import { LoadPlaylist, LoadPlaylistParams } from '../../../domain/usecases/music/load-playlist'
import { MusicModel } from '../../../domain/models/music'
import { LoadPlaylistRepository } from '../../../data/protocols/db/music/load-playlist-repository'

export class DbLoadPlaylist implements LoadPlaylist {
  constructor (private readonly loadPlaylistRepository: LoadPlaylistRepository) {}
  async load (data: LoadPlaylistParams): Promise<MusicModel[]> {
    const category = 'rock'
    const playlist = await this.loadPlaylistRepository.loadPlaylistByCategory({
      accessToken: data.accessToken,
      category
    })
    return playlist
  }
}
