import { ValidationComposite, SugestPlaylistRequestValidation } from '../../../../../validation/validators'
import { Validation } from '../../../../../presentation/protocols/validation'
import { SugestPlaylistRequestValidatorAdapter } from '../../../../../infra/validators/sugest-playlist-request-validator-adapter'

export const makeLoadPlaylistValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  validations.push(SugestPlaylistRequestValidation(new SugestPlaylistRequestValidatorAdapter()))
  return new ValidationComposite(validations)
}
