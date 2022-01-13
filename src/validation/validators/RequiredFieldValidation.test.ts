
import { MissingParamError } from '../../presentation/errors/MissingParamError'
import { RequeiredFieldValidation } from './RequiredFieldValidation'

describe('Required Field Validation', () => {
    test('should return MissimparaErrror if validation fails ', () => {
        const sut = new RequeiredFieldValidation('anyField')

        const error = sut.validate({ name: 'anyName' })

        expect(error).toEqual(new MissingParamError('anyField'))
    })
    test('should return null if validation succeeded', () => {
        const sut = new RequeiredFieldValidation('anyField')

        const validationReturn = sut.validate({ anyField: 'anyField' })

        expect(validationReturn).toBeFalsy()
    })
})
