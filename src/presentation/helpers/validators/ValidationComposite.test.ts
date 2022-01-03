import { MissingParamError } from '../../errors/MissingParamError'
import { Validation } from './Validation'

import { ValidationComposite } from './ValidationComposite'

class ValidationStub implements Validation {
    validate(input: any): Error | null {
        return null
    }
}

describe('Validation Composite', () => {
    test('should return an error if any validation returns error', () => {
        const validationStub = new ValidationStub()

        jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('field'))

        const sut = new ValidationComposite([validationStub])

        const error = sut.validate({ field: 'anyValue' })

        expect(error).toEqual(new MissingParamError('field'))
    })
    test('should return null if validation succeeded', () => {
        const validationStub = new ValidationStub()

        const sut = new ValidationComposite([validationStub])

        const validationReturn = sut.validate({ field: 'anyValue', fieldToCompare: 'anyValue' })

        expect(validationReturn).toBeFalsy()
    })
})
