import * as dotenv from 'dotenv'

dotenv.config()

export default {
  spotifyClientId: process.env.SPOTIFY_CLIENT_ID,
  spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  openWeatherApiKey: process.env.OPEN_WEATHER_API_KEY
}
