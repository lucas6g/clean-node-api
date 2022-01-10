
import { CompareFieldsValidation } from '../../../../presentation/helpers/validators/CompareFieldsValidation'
import { EmailValidation } from '../../../../presentation/helpers/validators/EmailValidation'
import { RequeiredFieldValidation } from '../../../../presentation/helpers/validators/RequiredFieldValidation'
import { Validation } from '../../../../presentation/protocols/Validation'
import { ValidationComposite } from '../../../../presentation/helpers/validators/ValidationComposite'
import { EmailValidatorAdpter } from '../../../adpters/validators/EmailValidatorAdpter'

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
