import { SpotifyPlaylists } from './spotify-playlist'

export interface SpotifyApy {
  getPlaylistsByCategory: (category: string) => Promise<SpotifyPlaylists>
}
