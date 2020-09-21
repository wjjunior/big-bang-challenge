export interface SpotifyPlaylists {
  playlists: {
    href: string
    items: SpotifyPlaylist[]
  }
}

export interface SpotifyPlaylist {
  id: string
  name: string
}
