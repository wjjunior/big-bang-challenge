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

beforeEach(() => {
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
})

describe('Content Type Middleware', () => {
  test('Should return default content type as json', async () => {
    app.get('/test_content_type', (req, res) => {
      res.json('')
    })
    await request(app).get('/test_content_type').expect('content-type', /json/)
  })

  test('Should return xml content when forced', async () => {
    app.get('/test_content_type_xml', (req, res) => {
      res.type('xml')
      res.json('')
    })
    await request(app)
      .get('/test_content_type_xml')
      .expect('content-type', /xml/)
  })
})
