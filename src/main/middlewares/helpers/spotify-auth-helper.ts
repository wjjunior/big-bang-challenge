import fetch from 'node-fetch'
import { SpotifyAuthRequest } from '../protocols/spotify-auth-request'

export const spotifyAuthRequest = async (): Promise<SpotifyAuthRequest> => {
  const authorization = Buffer.from('cb6924bf00a544fe923cf4e45f349b9e:628521daf41c4447b1707058ff1c3c56').toString('base64')
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
