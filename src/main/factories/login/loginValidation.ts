
import { EmailValidation } from '../../../presentation/helpers/validators/EmailValidation'
import { RequeiredFieldValidation } from '../../../presentation/helpers/validators/RequiredFieldValidation'
import { Validation } from '../../../presentation/protocols/Validation'
import { ValidationComposite } from '../../../presentation/helpers/validators/ValidationComposite'
import { EmailValidatorAdpter } from '../../../utils/EmailValidatorAdpter'

// composite factory
export const makeLoginValidation = (): Validation => {
    return new ValidationComposite([

        new RequeiredFieldValidation('email'),
        new RequeiredFieldValidation('password'),

        new EmailValidation('email', new EmailValidatorAdpter())

    ])
}
