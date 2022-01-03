import { EmailValidator } from '../../controllers/SignupController/protocols/EmailValidator'
import { InvalidParamError } from '../../errors/InvalidEmailError'

import { Validation } from './Validation'

export class EmailValidation implements Validation {
    private readonly fieldName: string
    private readonly emailValidator: EmailValidator
    constructor(fieldName: string, emailValidator: EmailValidator) {
        this.emailValidator = emailValidator
        this.fieldName = fieldName
    }

    validate(input: any): Error | null {
        const isValidEmail = this.emailValidator.isValid(input[this.fieldName])

        if (!isValidEmail) {
            return new InvalidParamError(this.fieldName)
        }

        return null
    }
}
