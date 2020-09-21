import { Response } from 'node-fetch'

export interface SpotifyAuthRequest {
  response: Response
  body: {
    access_token: string
    detail?: string
  }
}
