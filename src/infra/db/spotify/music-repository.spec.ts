import { MusicRepository } from './music-repository'
import SpotifyApi from './helpers/spotify-api'

const token = 'any_token'
const category = 'any_category'

beforeAll(() => {
  jest
    .spyOn(SpotifyApi.prototype, 'getPlaylistsByCategory')
    .mockReturnValueOnce(
      new Promise((resolve) =>
        resolve({
          href: 'any_href',
          items: [
            {
              id: 'any__playlist_id',
              name: 'any_playlist_name'
            }
          ]
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
  const sut = new MusicRepository(token)
  return {
    sut
  }
}

describe('Music Spotify Repository', () => {
  describe('loadPlaylistByCategory()', () => {
    test('Should load a playlist by category', async () => {
      const { sut } = makeSut()
      const musics = await sut.loadPlaylistByCategory(category)
      expect(musics.length).toBe(2)
    })
  })
})
