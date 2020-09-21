import request from 'supertest'
import app from '../config/app'

describe('Spotify Connector Middleware', () => {
  test('Should return an access token', async () => {
    app.get('/test_spotify_connector', (req, res) => {
      res.send()
    })
    await request(app).get('/test_spotify_connector')

    app.use(function (_req, res) {
      expect(res.locals.spotifyAccessToken).toBeTruthy()
      res.end()
    })
  })
})
