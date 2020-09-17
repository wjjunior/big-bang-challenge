import { MusicModel } from '../models/music'

export interface LoadPlaylist {
  load: () => Promise<MusicModel[]>
}
