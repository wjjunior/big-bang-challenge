import { LoadPlaylistParams } from '@/domain/usecases/music/load-playlist'
import { LoadPlaylistByCategoryParams, LoadPlaylistRepository } from '../../../data/protocols/db/music/load-playlist-repository'
import { MusicModel } from '../../../domain/models/music'
import { DbLoadPlaylist } from './db-load-playlist'

const makeFakeLoadPlaylistParams = (): LoadPlaylistParams => ({
  cityName: 'any_city',
  accessToken: 'any_token'
})

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
    async loadPlaylistByCategory (data: LoadPlaylistByCategoryParams): Promise<MusicModel[]> {
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
    const loadAllSpy = jest.spyOn(loadPlaylistRepositoryStub, 'loadPlaylistByCategory')
    await sut.load(makeFakeLoadPlaylistParams())
    expect(loadAllSpy).toHaveBeenCalled()
  })

  test('Should return a playlist on success', async () => {
    const { sut } = makeSut()
    const playlist = await sut.load(makeFakeLoadPlaylistParams())
    expect(playlist).toEqual(makeFakePlaylist())
  })

  test('Should throws if LoadPlanetsRepository throws', async () => {
    const { sut, loadPlaylistRepositoryStub } = makeSut()
    jest.spyOn(loadPlaylistRepositoryStub, 'loadPlaylistByCategory').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.load(makeFakeLoadPlaylistParams())
    await expect(promise).rejects.toThrow()
  })
})
