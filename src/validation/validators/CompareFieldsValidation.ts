import { InvalidParamError } from '../../presentation/errors/InvalidParamError'

import { Validation } from '../../presentation/protocols/Validation'

export class CompareFieldsValidation implements Validation {
  private readonly field: string
  private readonly fieldToCompare: string

  constructor(field: string, fieldToCompare: string) {
    this.field = field
    this.fieldToCompare = fieldToCompare
  }

  validate(input: any): Error | null {
    if (input[this.field] !== input[this.fieldToCompare]) {
      return new InvalidParamError(this.fieldToCompare)
    }

    return null
  }
}
