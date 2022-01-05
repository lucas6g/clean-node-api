import { EmailValidator } from '../presentation/protocols/EmailValidator'
import validator from 'validator'

export class EmailValidatorAdpter implements EmailValidator {
  isValid(email: string): boolean {
    return validator.isEmail(email)
  }
}
