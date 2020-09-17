import { MusicModel } from '../../../../domain/models/music'

export interface LoadPlaylistRepository {
  loadPlaylistByCategory: (category: string) => Promise<MusicModel[]>
}
