
type Sometime<T> = T | Promise<T>
export interface Validation<T = any> {
  validate: (input: T) => Sometime<Error | undefined>
}
