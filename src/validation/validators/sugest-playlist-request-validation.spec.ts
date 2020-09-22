import { SugestPlaylistRequestValidation } from './sugest-playlist-request-validation'
import { InvalidParamError } from '../../presentation/errors'
import { SugestPlaylistRequestValidator } from '../protocols/sugest-playlist-request-validator'
import { Validation } from '../../presentation/protocols/validation'
import {
  SugestPlaylistRequestParams,
  JoiValidation
} from '../../infra/validators/sugest-playlist-request-validator-adapter'

const errorMessage = 'any_error'

const makeSugestPlaylistValidator = (): SugestPlaylistRequestValidator => {
  class SugestPlaylistRequestValidatorStub
  implements SugestPlaylistRequestValidator {
    isValid (data: SugestPlaylistRequestParams): JoiValidation {
      return {
        isValid: true
      }
    }
  }
  return new SugestPlaylistRequestValidatorStub()
}

type SutTypes = {
  sut: Validation
  sugestPlaylistRequestValidatorStub: SugestPlaylistRequestValidator
}

const makeSut = (): SutTypes => {
  const sugestPlaylistRequestValidatorStub = makeSugestPlaylistValidator()
  const sut = SugestPlaylistRequestValidation(
    sugestPlaylistRequestValidatorStub
  )
  return {
    sut,
    sugestPlaylistRequestValidatorStub
  }
}

describe('Sugest Playlist Request Validation', () => {
  test('Should return an error if SugestPlaylistRequestValidator returns false', async () => {
    const { sut, sugestPlaylistRequestValidatorStub } = makeSut()
    jest
      .spyOn(sugestPlaylistRequestValidatorStub, 'isValid')
      .mockReturnValueOnce({
        isValid: false,
        errors: errorMessage
      })
    const error = await sut.validate({
      cityName: 'any_name'
    })
    expect(error).toEqual(new InvalidParamError(errorMessage))
  })

  test('Should call SugestPlaylistRequestValidator with correct data', async () => {
    const { sut } = makeSut()
    const validate = await sut.validate({
      cityName: ''
    })
    expect(() => validate).not.toThrow(new InvalidParamError(errorMessage))
  })
})
