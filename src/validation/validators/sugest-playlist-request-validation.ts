import { Validation } from '../../presentation/protocols'
import { InvalidParamError } from '../../presentation/errors'
import { SugestPlaylistRequestValidator } from '../protocols/sugest-playlist-request-validator'

export const SugestPlaylistRequestValidation = (
  sugestPlaylistRequestValidator: SugestPlaylistRequestValidator
): Validation => ({
  validate: (input) => {
    const validation = sugestPlaylistRequestValidator.isValid(input)
    if (!validation.isValid) {
      return new InvalidParamError(validation.errors as string)
    }
  }
})
