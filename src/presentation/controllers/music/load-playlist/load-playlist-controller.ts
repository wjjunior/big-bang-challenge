import { Controller, HttpRequest, HttpResponse, LoadPlaylist } from './load-playlist-controller-protocols'

export class LoadPlaylistController implements Controller {
  constructor (private readonly loadPlaylist: LoadPlaylist) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadPlaylist.load()
    return null
  }
}
