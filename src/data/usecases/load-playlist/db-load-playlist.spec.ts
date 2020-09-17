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

describe('DbLoadPlaylist', () => {
  test('Should call LoadPlaylistRepository', async () => {
    class LoadPlaylistRepositoryStub implements LoadPlaylistRepository {
      async loadAll (): Promise<MusicModel[]> {
        return new Promise(resolve => resolve(makeFakePlaylist()))
      }
    }
    const loadPlaylistRepositoryStub = new LoadPlaylistRepositoryStub()
    const loadAllSpy = jest.spyOn(loadPlaylistRepositoryStub, 'loadAll')
    const sut = new DbLoadPlaylist(loadPlaylistRepositoryStub)
    await sut.load()
    expect(loadAllSpy).toHaveBeenCalled()
  })
})
