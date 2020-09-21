import request from 'supertest'
import app from '../config/app'

describe('Music Routes', () => {
  test('Should return music array on success', async () => {
    await request(app)
      .post('/api/sugest-musics')
      .send({
        cityName: 'Belo Horizonte'
      })
      .expect(200)
  })
})
