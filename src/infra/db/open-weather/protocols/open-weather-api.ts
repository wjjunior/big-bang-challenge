import { CurrentWeatherResponse } from './current-weather'

export interface OpenWeatherApi {
  getTemperatureByCityName: (cityName: string) => Promise<CurrentWeatherResponse>
  getTemperatureByCoordinates: (lat: number, lon: number) => Promise<CurrentWeatherResponse>
}
