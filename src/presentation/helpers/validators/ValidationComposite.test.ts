import { MissingParamError } from '../../errors/MissingParamError'
import { Validation } from './Validation'

import { ValidationComposite } from './ValidationComposite'

class RequeiredFieldValidationStub implements Validation {
    validate(input: any): Error | null {
        return null
    }
}

describe('Validation Composite', () => {
    test('should return an error if any validation returns error', () => {
        const requireFieldsValidation = new RequeiredFieldValidationStub()

        jest.spyOn(requireFieldsValidation, 'validate').mockReturnValueOnce(new MissingParamError('field'))

        const sut = new ValidationComposite([requireFieldsValidation])

        const error = sut.validate({ field: 'anyValue' })

        expect(error).toEqual(new MissingParamError('field'))
    })
})
