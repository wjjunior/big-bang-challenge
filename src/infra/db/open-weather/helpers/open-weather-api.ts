import fetch from 'node-fetch'
import { CurrentWeatherResponse } from '../protocols/current-weather'
import { OpenWeatherApi } from '../protocols/open-weather-api'
import env from '../../../../main/config/env'

export default class OpenWeatherApiHelper implements OpenWeatherApi {
  private readonly apiToken: string

  constructor () {
    this.apiToken = env.openWeatherApiKey
  }

  async getTemperatureByCityName (
    cityName: string
  ): Promise<CurrentWeatherResponse> {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${this.apiToken}`
    )
    return await response.json()
  }

  async getTemperatureByCoordinates (
    lat: number,
    lon: number
  ): Promise<CurrentWeatherResponse> {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiToken}`
    )
    return await response.json()
  }
}
