
import { EmailValidator } from '../../../../validation/protocols/EmailValidator'
import { CompareFieldsValidation } from '../../../../validation/validators/CompareFieldsValidation'
import { EmailValidation } from '../../../../validation/validators/EmailValidation'
import { RequeiredFieldValidation } from '../../../../validation/validators/RequiredFieldValidation'
import { ValidationComposite } from '../../../../validation/validators/ValidationComposite'
import { makeSignupValidation } from './makeSignupValidation'

jest.mock('../../../../validation/validators/ValidationComposite')

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
