import { LoadPlaylistController } from './load-playlist-controller'
import { MusicModel, LoadPlaylist } from './load-playlist-controller-protocols'

const makeFakePlaylist = (): MusicModel[] => {
  return [{
    name: 'any_name'
  }]
}

describe('LoadPlaylist Controller', () => {
  test('Should call LoadPlaylist', async () => {
    class LoadPlaylistStub implements LoadPlaylist {
      async load (): Promise<MusicModel[]> {
        return new Promise(resolve => resolve(makeFakePlaylist()))
      }
    }
    const loadPlaylistStub = new LoadPlaylistStub()
    const loadSpy = jest.spyOn(loadPlaylistStub, 'load')
    const sut = new LoadPlaylistController(loadPlaylistStub)
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })
})
