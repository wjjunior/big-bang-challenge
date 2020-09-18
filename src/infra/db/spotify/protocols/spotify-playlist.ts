export interface SpotifyPlaylists {
  href: string
  items: SpotifyPlaylist[]
}

export interface SpotifyPlaylist {
  id: string
  name: string
}
