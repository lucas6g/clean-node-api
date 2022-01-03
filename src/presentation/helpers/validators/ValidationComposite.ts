
import { Validation } from '../../protocols/Validation'

export class ValidationComposite implements Validation {
  // composite

  private readonly validations: Validation[]

  constructor(validations: Validation[]) {
    this.validations = validations
  }

  validate(input: any): Error | null {
    for (const validation of this.validations) {
      const error = validation.validate(input)
      if (error) {
        return error
      }
    }
    return null
  }
}
