import Joi from 'joi'

type Sometime<T> = T | Promise<T>
export const validate = (schema: Joi.Schema, data: any): Sometime<string | undefined> => {
  const isValid = schema.validate(data)
  return isValid.error ? isValid.error.message : undefined
}
