import { LoadPlaylistController } from './load-playlist-controller'
import {
  LoadPlaylist,
  HttpRequest
} from './load-playlist-controller-protocols'
import { badRequest, ok, serverError } from '../../../helpers/http/http-helper'
import {
  InvalidParamError,
  MissingParamError
} from '../../../../presentation/errors'
import { ValidationSpy } from '../../../../presentation/test/mock-validation'

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
  validationSpy: ValidationSpy
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
  const validationSpy = new ValidationSpy()
  const sut = new LoadPlaylistController(loadPlaylistStub, validationSpy)
  return {
    sut,
    loadPlaylistStub,
    validationSpy
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

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new MissingParamError('any_error')
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })

  test('Should return 400 if invalid city is provided', async () => {
    const { sut, loadPlaylistStub } = makeSut()
    jest
      .spyOn(loadPlaylistStub, 'load')
      .mockReturnValueOnce(new Promise((resolve) => resolve(null)))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(
      badRequest(new InvalidParamError('The received city name is invalid'))
    )
  })

  test('Should return 400 if invalid coordinates are provided', async () => {
    const { sut, loadPlaylistStub } = makeSut()
    jest
      .spyOn(loadPlaylistStub, 'load')
      .mockReturnValueOnce(new Promise((resolve) => resolve(null)))
    const httpResponse = await sut.handle({
      body: {},
      accessToken: 'any_token'
    })
    expect(httpResponse).toEqual(
      badRequest(new InvalidParamError('The received coordinates are invalid'))
    )
  })
})
