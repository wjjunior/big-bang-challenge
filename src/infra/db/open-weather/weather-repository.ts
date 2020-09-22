import { CurrentTemperatureRepository, LoadTemperatureParams } from '../../../data/protocols/db/weather/current-temperature-repository'
import OpenWeatherApiHelper from './helpers/open-weather-api'
import { CurrentWeatherResponse } from './protocols/current-weather'

export class WeatherRepository implements CurrentTemperatureRepository {
  async loadTemperature (data: LoadTemperatureParams): Promise<number> {
    const openWeatherApi = new OpenWeatherApiHelper()
    const { cityName, lat, lon } = data
    let temperatureResponse: CurrentWeatherResponse
    if (cityName) {
      temperatureResponse = await openWeatherApi.getTemperatureByCityName(cityName)
    } else {
      temperatureResponse = await openWeatherApi.getTemperatureByCoordinates(lat, lon)
    }

    if (temperatureResponse.cod !== 200) {
      return null
    }
    return temperatureResponse.main.temp
  }
}
