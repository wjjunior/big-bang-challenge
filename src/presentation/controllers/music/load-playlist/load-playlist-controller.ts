import { Controller, HttpRequest, HttpResponse, LoadPlaylist, Validation } from './load-playlist-controller-protocols'
import { badRequest, ok, serverError } from '../../../helpers/http/http-helper'
import { InvalidParamError } from '../../../../presentation/errors'

export class LoadPlaylistController implements Controller {
  constructor (
    private readonly loadPlaylist: LoadPlaylist,
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { cityName, lat, lon } = httpRequest.body
      const accessToken = httpRequest.accessToken
      const playlist = await this.loadPlaylist.load({ cityName, lat, lon, accessToken })
      if (!playlist) {
        if (cityName) {
          return badRequest(new InvalidParamError('The received city name is invalid'))
        } else {
          return badRequest(new InvalidParamError('The received coordinates are invalid'))
        }
      }
      return ok(playlist)
    } catch (error) {
      return serverError(error)
    }
  }
}
