import { EmailValidator } from '../presentation/controllers/SignupController/protocols/EmailValidator'

export class EmailValidatorAdpter implements EmailValidator {
  isValid (email: string): boolean {
    return false
  }
}
