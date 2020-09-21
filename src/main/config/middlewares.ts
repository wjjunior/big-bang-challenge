import { Express } from 'express'
import { bodyParser, contentType, cors, spotifyConnector } from '../middlewares'

export default (app: Express): void => {
  app.use(bodyParser)
  app.use(cors)
  app.use(contentType)
  app.use(spotifyConnector)
}
