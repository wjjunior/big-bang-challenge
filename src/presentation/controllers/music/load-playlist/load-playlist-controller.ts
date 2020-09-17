import { Controller, HttpRequest, HttpResponse, LoadPlaylist } from './load-playlist-controller-protocols'
import { ok, serverError } from '../../../helpers/http/http-helper'

export class LoadPlaylistController implements Controller {
  constructor (private readonly loadPlaylist: LoadPlaylist) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const playlist = await this.loadPlaylist.load()
      return ok(playlist)
    } catch (error) {
      return serverError(error)
    }
  }
}
