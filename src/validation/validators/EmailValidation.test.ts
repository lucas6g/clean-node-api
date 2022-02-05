
import { EmailValidation } from '../validators/EmailValidation'

import { EmailValidator } from '../protocols/EmailValidator'
import { InvalidParamError } from '../../presentation/errors/InvalidParamError'

const makeEmailValidator = (): EmailValidator => {
    // dependencia mockada
    class EmailValidatorStub implements EmailValidator {
        isValid(email: string): boolean {
            return true
        }
    }
    return new EmailValidatorStub()
}

interface SutTypes {
    sut: EmailValidation
    emailValidatorStub: EmailValidator

}

const makeSut = (): SutTypes => {
    const emailValidatorStub = makeEmailValidator()

    const sut = new EmailValidation('email', emailValidatorStub)

    return {
        sut,
        emailValidatorStub

    }
}

describe('EmailValidation', () => {
    test('should return an error if EmailValidator returns false', () => {
        const { sut, emailValidatorStub } = makeSut()
        jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)

        const error = sut.validate({ email: 'anyEmail@mail.com' })

        expect(error).toEqual(new InvalidParamError('email'))
    })
    test('should call EmailValidator whit correct email', () => {
        const { sut, emailValidatorStub } = makeSut()
        const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')

        sut.validate({ email: 'anyEmail@mail.com' })

        expect(isValidSpy).toHaveBeenCalledWith('anyEmail@mail.com')
    })

    test('should  throws error if  validator throws exeception', async () => {
        const { sut, emailValidatorStub } = makeSut()

        jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
            throw new Error()
        })

        expect(sut.validate).toThrow()
    })
})
