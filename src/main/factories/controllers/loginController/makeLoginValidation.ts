
import { EmailValidation } from '../../../../validation/validators/EmailValidation'
import { RequeiredFieldValidation } from '../../../../validation/validators/RequiredFieldValidation'
import { Validation } from '../../../../presentation/protocols/Validation'
import { ValidationComposite } from '../../../../validation/validators/ValidationComposite'
import { EmailValidatorAdpter } from '../../../../infra/validators/EmailValidatorAdpter'

// composite factory
export const makeLoginValidation = (): Validation => {
    return new ValidationComposite([

        new RequeiredFieldValidation('email'),
        new RequeiredFieldValidation('password'),

        new EmailValidation('email', new EmailValidatorAdpter())

    ])
}
