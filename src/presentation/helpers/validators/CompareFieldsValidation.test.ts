
import { CompareFieldsValidation } from './CompareFieldsValidation'
import { InvalidParamError } from '../../errors/InvalidEmailError'

describe('Compare Fields Validation', () => {
    test('should return InvalidParamError if validation fails ', () => {
        const sut = new CompareFieldsValidation('field', 'fieldToCompare')

        const error = sut.validate({ field: 'anyValue', fieldToCompare: 'invalidValue' })

        expect(error).toEqual(new InvalidParamError('fieldToCompare'))
    })
    test('should return null if validation succeeded', () => {
        const sut = new CompareFieldsValidation('field', 'fieldToCompare')

        const validationReturn = sut.validate({ field: 'anyValue', fieldToCompare: 'invalidValue' })

        expect(validationReturn).toBeFalsy()
    })
})
