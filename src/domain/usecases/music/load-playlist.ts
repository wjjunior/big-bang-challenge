export type LoadPlaylistParams = {
  cityName?: string
  lat?: number
  lon?: number
  accessToken: string
}

export interface LoadPlaylist {
  load: (data: LoadPlaylistParams) => Promise<string[]>
}
