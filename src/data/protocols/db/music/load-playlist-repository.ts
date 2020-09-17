import { MusicModel } from '../../../../domain/models/music'

export interface LoadPlaylistRepository {
  loadAll: () => Promise<MusicModel[]>
}
