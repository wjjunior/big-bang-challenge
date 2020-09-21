import { Request, Response, NextFunction } from 'express'
import { spotifyAuthRequest } from './helpers/spotify-auth-helper'

export const spotifyConnector = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { response, body } = await spotifyAuthRequest()
    if (response.status === 200) {
      res.locals.spotifyAccessToken = body.access_token
      next()
    } else {
      next({ statusCode: response.status, message: body.detail })
    }
  } catch (error) {
    next({ statusCode: 505, message: 'internal server error' })
  }
}
