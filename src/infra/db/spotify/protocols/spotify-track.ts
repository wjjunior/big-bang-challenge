export interface SpotifyTrackList {
  href: string
  items: SpotifyTrack[]
}

export interface SpotifyTrack {
  track: {
    name: string
  }
}
