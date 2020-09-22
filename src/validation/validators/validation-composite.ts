import { Validation } from '../../presentation/protocols'

type Sometime<T> = T | Promise<T>
export class ValidationComposite<T = any> implements Validation {
  constructor (private readonly validations: Validation[]) {}

  validate (input: T): Sometime<Error | undefined> {
    for (const validation of this.validations) {
      const error = validation.validate(input)
      if (error) {
        return error
      }
    }
  }
}
