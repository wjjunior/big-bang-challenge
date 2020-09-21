import { CurrentTemperatureRepository, LoadTemperatureParams } from '../../../data/protocols/db/weather/current-temperature-repository'
import OpenWeatherApiHelper from './helpers/open-weather-api'

export class WeatherRepository implements CurrentTemperatureRepository {
  async loadTemperature (data: LoadTemperatureParams): Promise<number> {
    const openWeatherApi = new OpenWeatherApiHelper()
    const { cityName, lat, lon } = data
    if (cityName) {
      const temperatureResponse = await openWeatherApi.getTemperatureByCityName(cityName)
      return temperatureResponse.main.temp
    } else {
      const temperatureResponse = await openWeatherApi.getTemperatureByCoordinates(lat, lon)
      return temperatureResponse.main.temp
    }
  }
}
