
import fetch from 'node-fetch'
import { SpotifyApy, SpotifyPlaylists, SpotifyTrackList } from '../protocols'

export default class SpotifyApiHelper implements SpotifyApy {
  private readonly accessToken: string

  constructor (accessToken: string) {
    this.accessToken = accessToken
  }

  async getPlaylistsByCategory (category: string): Promise<SpotifyPlaylists> {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${category}&type=playlist`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + this.accessToken
      }
    })
    return await response.json()
  }

  async getPlaylistTracks (id: string): Promise<SpotifyTrackList> {
    const response = await fetch(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + this.accessToken
      }
    })
    return await response.json()
  }
}
