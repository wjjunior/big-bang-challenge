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

describe('Body Parser Middleware', () => {
  test('Should parse body as json', async () => {
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
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body)
    })
    await request(app)
      .post('/test_body_parser')
      .send({ name: 'Any Name' })
      .expect({ name: 'Any Name' })
  })
})
