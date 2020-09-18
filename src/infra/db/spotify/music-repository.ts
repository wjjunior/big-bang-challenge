import { LoadPlaylistRepository } from '../../../data/protocols/db/music/load-playlist-repository'
import { MusicModel } from '../../../domain/models/music'
import SpotifyApi from './helpers/spotify-api'
import { SpotifyTrack } from './protocols'

export class MusicRepository implements LoadPlaylistRepository {
  private readonly spotifyApi: SpotifyApi
  constructor (accessToken: string) {
    this.spotifyApi = new SpotifyApi(accessToken)
  }

  async loadPlaylistByCategory (category: string): Promise<MusicModel[]> {
    const playlistResponse = await this.spotifyApi.getPlaylistsByCategory(
      category
    )
    const tracksResponse = await this.spotifyApi.getPlaylistTracks(
      playlistResponse.items[0].id
    )

    return tracksResponse.items.map((track: SpotifyTrack) => {
      const music: MusicModel = { name: track.name }
      return music
    })
  }
}
