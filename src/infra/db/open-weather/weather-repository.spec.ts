import { WeatherRepository } from './weather-repository'
import OpenWeatherApi from './helpers/open-weather-api'

beforeAll(() => {
  jest
    .spyOn(OpenWeatherApi.prototype, 'getTemperatureByCityName')
    .mockReturnValueOnce(
      new Promise((resolve) =>
        resolve({
          cod: 200,
          main: {
            temp: 200
          }
        })
      )
    )

  jest.spyOn(OpenWeatherApi.prototype, 'getTemperatureByCoordinates').mockReturnValueOnce(
    new Promise((resolve) =>
      resolve({
        cod: 200,
        main: {
          temp: 150
        }
      })
    )
  )
})

interface SutTypes {
  sut: WeatherRepository
}
const makeSut = (): SutTypes => {
  const sut = new WeatherRepository()
  return {
    sut
  }
}

describe('Weather Repository', () => {
  describe('loadTemperature()', () => {
    test('Should load the temperature by city name', async () => {
      const { sut } = makeSut()
      const temp = await sut.loadTemperature({
        cityName: 'any_city'
      })
      expect(temp).toEqual(200)
    })

    test('Should load the temperature by coordinates', async () => {
      const { sut } = makeSut()
      const temp = await sut.loadTemperature({
        lat: 123,
        lon: 321
      })
      expect(temp).toEqual(150)
    })
  })
})
