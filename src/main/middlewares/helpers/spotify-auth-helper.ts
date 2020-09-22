import fetch from 'node-fetch'
import { SpotifyAuthRequest } from '../protocols/spotify-auth-request'
import env from '../../config/env'

export const spotifyAuthRequest = async (): Promise<SpotifyAuthRequest> => {
  const authorization = Buffer.from(`${env.spotifyClientId}:${env.spotifyClientSecret}`).toString('base64')
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'post',
    headers: {
      Authorization: `Basic ${authorization}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials'
    })
  })
  return {
    response,
    body: await response.json()
  }
}
