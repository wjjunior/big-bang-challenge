import { LoadPlaylistController } from './load-playlist-controller'
import { MusicModel, LoadPlaylist } from './load-playlist-controller-protocols'

const makeFakePlaylist = (): MusicModel[] => {
  return [{
    name: 'any_name'
  }]
}

interface SutTypes {
  sut: LoadPlaylistController
  loadPlaylistStub: LoadPlaylist
}

const makeLoadPlaylist = (): LoadPlaylist => {
  class LoadPlaylistStub implements LoadPlaylist {
    async load (): Promise<MusicModel[]> {
      return new Promise(resolve => resolve(makeFakePlaylist()))
    }
  }
  return new LoadPlaylistStub()
}

const makeSut = (): SutTypes => {
  const loadPlaylistStub = makeLoadPlaylist()
  const sut = new LoadPlaylistController(loadPlaylistStub)
  return {
    sut,
    loadPlaylistStub
  }
}

describe('LoadPlaylist Controller', () => {
  test('Should call LoadPlaylist', async () => {
    const { sut, loadPlaylistStub } = makeSut()
    const loadSpy = jest.spyOn(loadPlaylistStub, 'load')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })
})
