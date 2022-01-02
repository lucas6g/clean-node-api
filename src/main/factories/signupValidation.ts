
import { RequeiredFieldValidation } from '../../presentation/helpers/validators/RequiredFieldValidation'
import { Validation } from '../../presentation/helpers/validators/Validation'
import { ValidationComposite } from '../../presentation/helpers/validators/ValidationComposite'

// padra de projeto factory
export const makeSignupValidation = (): Validation => {
    return new ValidationComposite([
        new RequeiredFieldValidation('name'),
        new RequeiredFieldValidation('email'),
        new RequeiredFieldValidation('password'),
        new RequeiredFieldValidation('passwordConfirmation')

    ])
}
