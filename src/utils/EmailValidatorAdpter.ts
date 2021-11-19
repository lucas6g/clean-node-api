import { EmailValidator } from '../presentation/controllers/SignupController/protocols/EmailValidator'
import validator from 'validator'

export class EmailValidatorAdpter implements EmailValidator {
  isValid (email: string): boolean {
    return validator.isEmail(email)
  }
}
