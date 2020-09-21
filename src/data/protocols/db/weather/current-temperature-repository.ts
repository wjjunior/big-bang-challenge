export type LoadTemperatureParams = {
  cityName?: string
  lat?: number
  lon?: number
}

export interface CurrentTemperatureRepository {
  loadTemperature: (data: LoadTemperatureParams) => Promise<number>
}
