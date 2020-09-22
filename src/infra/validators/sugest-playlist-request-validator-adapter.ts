import { SugestPlaylistRequestValidator } from '../../validation/protocols/sugest-playlist-request-validator'
import Joi from 'joi'
import { validate } from './joi-validate'

export type SugestPlaylistRequestParams = {
  cityName?: string
  lat?: number
  lon?: number
}

type Sometime<T> = T | Promise<T>
export type JoiValidation = {
  isValid: boolean
  errors?: Sometime<string>
}

const validationSchema: Joi.ObjectSchema = Joi.object()
  .keys({
    lat: Joi.number(),
    lon: Joi.number(),
    cityName: Joi.string().min(1)
      .when('lat', {
        is: Joi.string().empty(),
        then: Joi.when(
          'lon', {
            is: Joi.string().empty(),
            then: Joi.required()
          }
        )
      })
  })
  .with('lat', 'lon')
  .with('lon', 'lat')

export class SugestPlaylistRequestValidatorAdapter
implements SugestPlaylistRequestValidator {
  isValid (data: SugestPlaylistRequestParams): JoiValidation {
    const error = validate(validationSchema, data)
    if (error) {
      return {
        isValid: false,
        errors: error
      }
    }
    return {
      isValid: true
    }
  }
}
