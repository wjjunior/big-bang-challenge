import {
  CurrentTemperatureRepository,
  LoadTemperatureParams
} from '@/data/protocols/db/weather/current-temperature-repository'
import { LoadPlaylistParams } from '@/domain/usecases/music/load-playlist'
import {
  LoadPlaylistByCategoryParams,
  LoadPlaylistRepository
} from '../../../data/protocols/db/music/load-playlist-repository'
import { DbLoadPlaylist } from './db-load-playlist'

const makeFakeLoadPlaylistParams = (): LoadPlaylistParams => ({
  cityName: 'any_city',
  accessToken: 'any_token'
})

const makeFakePlaylist = (): string[] => {
  return ['any_name', 'other_name']
}

interface SutTypes {
  sut: DbLoadPlaylist
  loadPlaylistRepositoryStub: LoadPlaylistRepository
  currentTemperatureRepositoryStub: CurrentTemperatureRepository
}

const makeLoadPlaylistRepository = (): LoadPlaylistRepository => {
  class LoadPlaylistRepositoryStub implements LoadPlaylistRepository {
    async loadPlaylistByCategory (
      data: LoadPlaylistByCategoryParams
    ): Promise<string[]> {
      return new Promise((resolve) => resolve(makeFakePlaylist()))
    }
  }
  return new LoadPlaylistRepositoryStub()
}

const makeCurrentTemperatureRepository = (): CurrentTemperatureRepository => {
  class CurrentTemperatureRepositoryStub
  implements CurrentTemperatureRepository {
    async loadTemperature (data: LoadTemperatureParams): Promise<number> {
      return new Promise((resolve) => resolve(200))
    }
  }
  return new CurrentTemperatureRepositoryStub()
}

const makeSut = (): SutTypes => {
  const loadPlaylistRepositoryStub = makeLoadPlaylistRepository()
  const currentTemperatureRepositoryStub = makeCurrentTemperatureRepository()
  const sut = new DbLoadPlaylist(
    loadPlaylistRepositoryStub,
    currentTemperatureRepositoryStub
  )
  return {
    sut,
    loadPlaylistRepositoryStub,
    currentTemperatureRepositoryStub
  }
}

describe('DbLoadPlaylist', () => {
  test('Should call LoadPlaylistRepository', async () => {
    const {
      sut,
      loadPlaylistRepositoryStub,
      currentTemperatureRepositoryStub
    } = makeSut()
    const loadAllSpy = jest.spyOn(
      loadPlaylistRepositoryStub,
      'loadPlaylistByCategory'
    )
    const loadTemperatureSpy = jest.spyOn(
      currentTemperatureRepositoryStub,
      'loadTemperature'
    )
    await sut.load(makeFakeLoadPlaylistParams())
    expect(loadAllSpy).toHaveBeenCalled()
    expect(loadTemperatureSpy).toHaveBeenCalled()
  })

  test('Should return a classical playlist on success', async () => {
    const { sut, currentTemperatureRepositoryStub } = makeSut()
    jest
      .spyOn(currentTemperatureRepositoryStub, 'loadTemperature')
      .mockReturnValueOnce(new Promise((resolve) => resolve(280)))
    const playlist = await sut.load(makeFakeLoadPlaylistParams())
    expect(playlist).toEqual(makeFakePlaylist())
  })

  test('Should return a rock playlist on success', async () => {
    const { sut, currentTemperatureRepositoryStub } = makeSut()
    jest
      .spyOn(currentTemperatureRepositoryStub, 'loadTemperature')
      .mockReturnValueOnce(new Promise((resolve) => resolve(285)))
    const playlist = await sut.load(makeFakeLoadPlaylistParams())
    expect(playlist).toEqual(makeFakePlaylist())
  })

  test('Should return a pop playlist on success', async () => {
    const { sut, currentTemperatureRepositoryStub } = makeSut()
    jest
      .spyOn(currentTemperatureRepositoryStub, 'loadTemperature')
      .mockReturnValueOnce(new Promise((resolve) => resolve(300)))
    const playlist = await sut.load(makeFakeLoadPlaylistParams())
    expect(playlist).toEqual(makeFakePlaylist())
  })

  test('Should return a party playlist on success', async () => {
    const { sut, currentTemperatureRepositoryStub } = makeSut()
    jest
      .spyOn(currentTemperatureRepositoryStub, 'loadTemperature')
      .mockReturnValueOnce(new Promise((resolve) => resolve(310)))
    const playlist = await sut.load(makeFakeLoadPlaylistParams())
    expect(playlist).toEqual(makeFakePlaylist())
  })

  test('Should throws if LoadPlanetsRepository throws', async () => {
    const { sut, loadPlaylistRepositoryStub } = makeSut()
    jest
      .spyOn(loadPlaylistRepositoryStub, 'loadPlaylistByCategory')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )
    const promise = sut.load(makeFakeLoadPlaylistParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should throws if CurrentTemperatureRepository throws', async () => {
    const { sut, currentTemperatureRepositoryStub } = makeSut()
    jest
      .spyOn(currentTemperatureRepositoryStub, 'loadTemperature')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )
    const promise = sut.load(makeFakeLoadPlaylistParams())
    await expect(promise).rejects.toThrow()
  })
})
