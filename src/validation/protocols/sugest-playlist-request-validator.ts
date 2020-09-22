import { JoiValidation, SugestPlaylistRequestParams } from '../../infra/validators/sugest-playlist-request-validator-adapter'

export interface SugestPlaylistRequestValidator {
  isValid: (data: SugestPlaylistRequestParams) => JoiValidation
}
