import { LoadPlaylist } from '../../../domain/usecases/load-playlist'
import { MusicModel } from '../../../domain/models/music'
import { LoadPlaylistRepository } from '../../../data/protocols/db/music/load-playlist-repository'

export class DbLoadPlaylist implements LoadPlaylist {
  constructor (private readonly loadPlaylistRepository: LoadPlaylistRepository) {}
  async load (): Promise<MusicModel[]> {
    const playlist = await this.loadPlaylistRepository.loadAll()
    return playlist
  }
}
