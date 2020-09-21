import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeLoadPlaylistController } from '../factories/controllers/music/load-playlist/load-playlist-controller-factory'

export default (router: Router): void => {
  router.post('/sugest-musics', adaptRoute(makeLoadPlaylistController()))
}
