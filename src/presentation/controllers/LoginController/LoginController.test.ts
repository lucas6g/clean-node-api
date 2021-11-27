import { MissingParamError } from '../../errors/MissingParamError'
import { EmailValidator } from '../SignupController/protocols/EmailValidator'

import { LoginController } from './LoginController'

const makeEmailValidator = (): EmailValidator => {
  // dependencia mockada
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

interface SutTypes {
  sut: LoginController
  emailValidatorStub: EmailValidator
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const sut = new LoginController(emailValidatorStub)
  return {
    sut,
    emailValidatorStub

  }
}

describe('Login Controller', () => {
  test('should return 400 if no email is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        password: 'anyPassword'
      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.body).toEqual((new MissingParamError('email')))
    expect(httpResponse.statusCode).toBe(400)
  })
  test('should return 400 if no password is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        email: 'anyEmail@mail.com'

      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.body).toEqual((new MissingParamError('password')))
    expect(httpResponse.statusCode).toBe(400)
  })
  test('should call EmailValidator whit correct email', async () => {
    const { sut, emailValidatorStub } = makeSut()

    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')

    const httpRequest = {
      body: {
        email: 'anyEmail@mail.com',
        password: 'anyPassword'

      }
    }

    await sut.handle(httpRequest)

    expect(isValidSpy).toHaveBeenCalledWith('anyEmail@mail.com')
  })
})
