
import { RequeiredFieldValidation } from '../../../../validation/validators/RequiredFieldValidation'
import { Validation } from '../../../../presentation/protocols/Validation'
import { ValidationComposite } from '../../../../validation/validators/ValidationComposite'

// composite factory
export const makeCreateSurveyValidation = (): Validation => {
    return new ValidationComposite([
        new RequeiredFieldValidation('question'),
        new RequeiredFieldValidation('answers')

    ])
}
