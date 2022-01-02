import { RequeiredFieldValidation } from '../../presentation/helpers/validators/RequiredFieldValidation'
import { ValidationComposite } from '../../presentation/helpers/validators/ValidationComposite'
import { makeSignupValidation } from './signupValidation'

jest.mock('../../presentation/helpers/validators/ValidationComposite')

describe('SignUpValidation Factory', () => {
    test('should call validation composite whit all validations', () => {
        makeSignupValidation()

        expect(ValidationComposite).toHaveBeenCalledWith([
            new RequeiredFieldValidation('name'),
            new RequeiredFieldValidation('email'),
            new RequeiredFieldValidation('password'),
            new RequeiredFieldValidation('passwordConfirmation')

        ])
    })
})
