import { LoadPlaylistRepository } from '../../../data/protocols/db/music/load-playlist-repository'
import { MusicModel } from '../../../domain/models/music'
import { DbLoadPlaylist } from './db-load-playlist'

const makeFakePlaylist = (): MusicModel[] => {
  return [{
    name: 'any_name'
  }, {
    name: 'other_name'
  }]
}

interface SutTypes {
  sut: DbLoadPlaylist
  loadPlaylistRepositoryStub: LoadPlaylistRepository
}

const makeLoadPlaylistRepository = (): LoadPlaylistRepository => {
  class LoadPlaylistRepositoryStub implements LoadPlaylistRepository {
    async loadAll (): Promise<MusicModel[]> {
      return new Promise(resolve => resolve(makeFakePlaylist()))
    }
  }
  return new LoadPlaylistRepositoryStub()
}

const makeSut = (): SutTypes => {
  const loadPlaylistRepositoryStub = makeLoadPlaylistRepository()
  const sut = new DbLoadPlaylist(loadPlaylistRepositoryStub)
  return {
    sut,
    loadPlaylistRepositoryStub
  }
}

describe('DbLoadPlaylist', () => {
  test('Should call LoadPlaylistRepository', async () => {
    const { sut, loadPlaylistRepositoryStub } = makeSut()
    const loadAllSpy = jest.spyOn(loadPlaylistRepositoryStub, 'loadAll')
    await sut.load()
    expect(loadAllSpy).toHaveBeenCalled()
  })
})
