import { SugestPlaylistRequestValidatorAdapter } from './sugest-playlist-request-validator-adapter'
import * as Validate from './joi-validate'

const makeSut = (): SugestPlaylistRequestValidatorAdapter => {
  return new SugestPlaylistRequestValidatorAdapter()
}

describe('EmailValidatorAdapter', () => {
  test('Should return false if validator returns false', () => {
    const sut = makeSut()
    jest.spyOn(Validate, 'validate').mockImplementationOnce(() => 'any_error')
    const validate = sut.isValid({
      cityName: 'any_city'
    })
    expect(validate.isValid).toBe(false)
  })

  test('Should return true if validator returns true', () => {
    const sut = makeSut()
    jest.spyOn(Validate, 'validate').mockImplementationOnce(() => null)
    const validate = sut.isValid({
      cityName: 'any_city'
    })
    expect(validate.isValid).toBe(true)
  })
})
