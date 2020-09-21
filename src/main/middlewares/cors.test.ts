import request from 'supertest'
import app from '../config/app'
import * as spotifyAuthRequest from './helpers/spotify-auth-helper'

interface SutTypes {
  spotifyAuthRequestStub: any
}

const makeSut = (): SutTypes => {
  const spotifyAuthRequestStub = spotifyAuthRequest
  return {
    spotifyAuthRequestStub
  }
}

describe('CORS Middleware', () => {
  test('Should enable CORS', async () => {
    const { spotifyAuthRequestStub } = makeSut()
    jest
      .spyOn(spotifyAuthRequestStub, 'spotifyAuthRequest')
      .mockImplementation(() => {
        return {
          response: {
            status: 200
          },
          body: {
            access_token: 'any_token'
          }
        }
      })
    app.get('/test_cors', (req, res) => {
      res.send()
    })
    await request(app)
      .get('/test_cors')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-methods', '*')
      .expect('access-control-allow-headers', '*')
  })
})
