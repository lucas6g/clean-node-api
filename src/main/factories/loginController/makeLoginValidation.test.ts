import { EmailValidator } from '../../../presentation/protocols/EmailValidator'

import { EmailValidation } from '../../../presentation/helpers/validators/EmailValidation'
import { RequeiredFieldValidation } from '../../../presentation/helpers/validators/RequiredFieldValidation'
import { ValidationComposite } from '../../../presentation/helpers/validators/ValidationComposite'

import { makeLoginValidation } from './makeLoginValidation'

jest.mock('../../../presentation/helpers/validators/ValidationComposite')

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
