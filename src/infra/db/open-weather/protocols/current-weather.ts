export interface CurrentWeatherResponse {
  cod: number
  main: {
    temp: number
  }
  message?: string
}
