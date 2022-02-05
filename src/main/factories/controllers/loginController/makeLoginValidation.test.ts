
import { EmailValidator } from '../../../../validation/protocols/EmailValidator'
import { EmailValidation } from '../../../../validation/validators/EmailValidation'
import { RequeiredFieldValidation } from '../../../../validation/validators/RequiredFieldValidation'
import { ValidationComposite } from '../../../../validation/validators/ValidationComposite'
import { makeLoginValidation } from './makeLoginValidation'

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

describe('LoginValidation Factory', () => {
    test('should call validation composite whit all validations', () => {
        makeLoginValidation()

        expect(ValidationComposite).toHaveBeenCalledWith([

            new RequeiredFieldValidation('email'),
            new RequeiredFieldValidation('password'),

            new EmailValidation('email', makeEmailValidator())

        ])
    })
})
