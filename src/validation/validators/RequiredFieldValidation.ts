import { MissingParamError } from '../../presentation/errors/MissingParamError'
import { Validation } from '../../presentation/protocols/Validation'

export class RequeiredFieldValidation implements Validation {
  private readonly fieldName: string
  constructor(fieldName: string) {
    this.fieldName = fieldName
  }

  validate(input: any): Error | null {
    if (!input[this.fieldName]) {
      return new MissingParamError(this.fieldName)
    }

    return null
  }
}
