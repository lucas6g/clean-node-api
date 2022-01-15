import { RequeiredFieldValidation } from '../../../../validation/validators/RequiredFieldValidation'
import { ValidationComposite } from '../../../../validation/validators/ValidationComposite'
import { makeCreateSurveyValidation } from './makeCreateSurveyValidation'

jest.mock('../../../../validation/validators/ValidationComposite')



describe('CreateSurveyValidation Factory', () => {
    test('should call validation composite whit all validations', () => {

        makeCreateSurveyValidation()

        expect(ValidationComposite).toHaveBeenCalledWith([
            new RequeiredFieldValidation('question'),
            new RequeiredFieldValidation('answers'),


        ])
    })
})
