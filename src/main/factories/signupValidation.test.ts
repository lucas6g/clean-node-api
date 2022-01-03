import { EmailValidator } from '../../presentation/controllers/SignupController/protocols/EmailValidator'
import { CompareFieldsValidation } from '../../presentation/helpers/validators/CompareFieldsValidation'
import { EmailValidation } from '../../presentation/helpers/validators/EmailValidation'
import { RequeiredFieldValidation } from '../../presentation/helpers/validators/RequiredFieldValidation'
import { ValidationComposite } from '../../presentation/helpers/validators/ValidationComposite'

import { makeSignupValidation } from './signupValidation'

jest.mock('../../presentation/helpers/validators/ValidationComposite')

const makeEmailValidator = (): EmailValidator => {
    // dependencia mockada
    class EmailValidatorStub implements EmailValidator {
        isValid(email: string): boolean {
            return true
        }
    }
    return new EmailValidatorStub()
}

describe('SignUpValidation Factory', () => {
    test('should call validation composite whit all validations', () => {
        makeSignupValidation()

        expect(ValidationComposite).toHaveBeenCalledWith([
            new RequeiredFieldValidation('name'),
            new RequeiredFieldValidation('email'),
            new RequeiredFieldValidation('password'),
            new RequeiredFieldValidation('passwordConfirmation'),
            new CompareFieldsValidation('password', 'passwordConfirmation'),
            new EmailValidation('email', makeEmailValidator())

        ])
    })
})
