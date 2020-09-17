import { MusicModel } from '../models/music'

export interface LoadPlaylist {
  load: (category: string) => Promise<MusicModel[]>
}
