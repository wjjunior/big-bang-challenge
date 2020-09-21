import {
  LoadPlaylistByCategoryParams,
  LoadPlaylistRepository
} from '../../../data/protocols/db/music/load-playlist-repository'
import { MusicModel } from '../../../domain/models/music'
import SpotifyApi from './helpers/spotify-api'
import { SpotifyTrack } from './protocols'

export class MusicRepository implements LoadPlaylistRepository {
  async loadPlaylistByCategory (
    data: LoadPlaylistByCategoryParams
  ): Promise<MusicModel[]> {
    const { accessToken, category } = data
    const spotifyApi = new SpotifyApi(accessToken)
    const playlistResponse = await spotifyApi.getPlaylistsByCategory(category)

    const tracksResponse = await spotifyApi.getPlaylistTracks(
      playlistResponse.playlists.items[
        Math.floor(Math.random() * playlistResponse.playlists.items.length)
      ].id
    )

    return tracksResponse.items.map((track: SpotifyTrack) => {
      const music: MusicModel = { name: track.name }
      return music
    })
  }
}
