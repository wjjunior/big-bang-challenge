import request from 'supertest'
import app from '../config/app'

describe('Music Routes', () => {
  test('Should return music array on success by city name', async () => {
    await request(app)
      .post('/api/sugest-musics')
      .send({
        cityName: 'Belo Horizonte'
      })
      .expect(200)
  })

  test('Should return music array on success by coordinates', async () => {
    await request(app)
      .post('/api/sugest-musics')
      .send({
        lat: 51.5072,
        lon: -0.1275
      })
      .expect(200)
  })
})
