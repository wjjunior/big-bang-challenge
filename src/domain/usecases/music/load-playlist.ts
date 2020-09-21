import { MusicModel } from '../../models/music'

export type LoadPlaylistParams = {
  cityName?: string
  lat?: number
  lon?: number
  accessToken: string
}

export interface LoadPlaylist {
  load: (data: LoadPlaylistParams) => Promise<MusicModel[]>
}
