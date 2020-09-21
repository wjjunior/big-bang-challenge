import { MusicRepository } from './music-repository'
import SpotifyApi from './helpers/spotify-api'
import { LoadPlaylistByCategoryParams } from '@/data/protocols/db/music/load-playlist-repository'

const makeFakeLoadPlaylistByCategoryParams = (): LoadPlaylistByCategoryParams => ({
  accessToken: 'any_token',
  category: 'any_category'
})

beforeAll(() => {
  jest
    .spyOn(SpotifyApi.prototype, 'getPlaylistsByCategory')
    .mockReturnValueOnce(
      new Promise((resolve) =>
        resolve({
          playlists: {
            href: 'any_href',
            items: [
              {
                id: 'any__playlist_id',
                name: 'any_playlist_name'
              }
            ]
          }
        })
      )
    )

  jest.spyOn(SpotifyApi.prototype, 'getPlaylistTracks').mockReturnValueOnce(
    new Promise((resolve) =>
      resolve({
        href: 'any_href',
        items: [
          {
            name: 'any_music_name'
          },
          {
            name: 'other_music_name'
          }
        ]
      })
    )
  )
})

interface SutTypes {
  sut: MusicRepository
}
const makeSut = (): SutTypes => {
  const sut = new MusicRepository()
  return {
    sut
  }
}

describe('Music Spotify Repository', () => {
  describe('loadPlaylistByCategory()', () => {
    test('Should load a playlist by category', async () => {
      const { sut } = makeSut()
      const musics = await sut.loadPlaylistByCategory(
        makeFakeLoadPlaylistByCategoryParams()
      )
      expect(musics.length).toBe(2)
    })
  })
})
