import { Controller, HttpRequest, HttpResponse, LoadPlaylist } from './load-playlist-controller-protocols'
import { ok, serverError } from '../../../helpers/http/http-helper'

export class LoadPlaylistController implements Controller {
  constructor (private readonly loadPlaylist: LoadPlaylist) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { cityName, lat, lon } = httpRequest.body
      const accessToken = httpRequest.accessToken
      const playlist = await this.loadPlaylist.load({ cityName, lat, lon, accessToken })
      return ok(playlist)
    } catch (error) {
      return serverError(error)
    }
  }
}
