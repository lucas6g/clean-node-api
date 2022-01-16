
import { CompareFieldsValidation } from '../../../../validation/validators/CompareFieldsValidation'
import { EmailValidation } from '../../../../validation/validators/EmailValidation'
import { RequeiredFieldValidation } from '../../../../validation/validators/RequiredFieldValidation'
import { Validation } from '../../../../presentation/protocols/Validation'
import { ValidationComposite } from '../../../../validation/validators/ValidationComposite'
import { EmailValidatorAdpter } from '../../../../infra/validators/EmailValidatorAdpter'

// composite factory
export const makeSignupValidation = (): Validation => {
    return new ValidationComposite([
        new RequeiredFieldValidation('name'),
        new RequeiredFieldValidation('email'),
        new RequeiredFieldValidation('password'),
        new RequeiredFieldValidation('passwordConfirmation'),
        new CompareFieldsValidation('password', 'passwordConfirmation'),
        new EmailValidation('email', new EmailValidatorAdpter())

    ])
}
