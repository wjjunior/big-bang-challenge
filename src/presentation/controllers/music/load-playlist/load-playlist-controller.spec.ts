import { LoadPlaylistController } from './load-playlist-controller'
import {
  LoadPlaylist,
  HttpRequest
} from './load-playlist-controller-protocols'
import { ok, serverError } from '../../../helpers/http/http-helper'

const mockRequest = (): HttpRequest => ({
  body: {
    cityName: 'any_city'
  },
  accessToken: 'any_token'
})

const makeFakePlaylist = (): string[] => {
  return ['any_name', 'other_name']
}

interface SutTypes {
  sut: LoadPlaylistController
  loadPlaylistStub: LoadPlaylist
}

const makeLoadPlaylist = (): LoadPlaylist => {
  class LoadPlaylistStub implements LoadPlaylist {
    async load (): Promise<string[]> {
      return new Promise((resolve) => resolve(makeFakePlaylist()))
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
    await sut.handle(mockRequest())
    expect(loadSpy).toHaveBeenCalled()
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(makeFakePlaylist()))
  })

  test('Should return 500 if loadPlanets throws', async () => {
    const { sut, loadPlaylistStub } = makeSut()
    jest
      .spyOn(loadPlaylistStub, 'load')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
