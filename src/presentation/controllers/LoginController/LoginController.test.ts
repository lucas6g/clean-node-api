import { Authentication } from '../../../domain/usecases/Authentication'
import { UnauthorizedError } from '../../errors/UnauthorizedError'
import { InvalidParamError } from '../../errors/InvalidEmailError'
import { MissingParamError } from '../../errors/MissingParamError'

import { HttpRequest } from '../../protocols/Http'

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
const makeAuthenticationStub = (): Authentication => {
  // dependencia mockada
  class AuthenticationStub implements Authentication {
    async auth (email: string, password: string): Promise<string> {
      return await Promise.resolve('anyToken')
    }
  }
  return new AuthenticationStub()
}

const makeFakeHttpRequest = (): HttpRequest => {
  return {
    body: {
      email: 'anyEmail@mail.com',
      password: 'anyPassword'

    }
  }
}

interface SutTypes {
  sut: LoginController
  emailValidatorStub: EmailValidator
  authenticationStub: Authentication
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const authenticationStub = makeAuthenticationStub()
  const sut = new LoginController(emailValidatorStub, authenticationStub)
  return {
    sut,
    emailValidatorStub,
    authenticationStub

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

    const httpRequest = makeFakeHttpRequest()

    await sut.handle(httpRequest)

    expect(isValidSpy).toHaveBeenCalledWith('anyEmail@mail.com')
  })
  test('should return 400 if invalid email is provided', async () => {
    const { sut, emailValidatorStub } = makeSut()

    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)

    const httpRequest = makeFakeHttpRequest()

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.body).toEqual(new InvalidParamError('email'))
  })
  test('should call authentication whit correct values ', async () => {
    const { sut, authenticationStub } = makeSut()

    const authSpy = jest.spyOn(authenticationStub, 'auth')

    const httpRequest = makeFakeHttpRequest()

    await sut.handle(httpRequest)

    expect(authSpy).toHaveBeenCalledWith('anyEmail@mail.com', 'anyPassword')
  })
  test('should return 401 if invalid credentions are provided', async () => {
    const { sut, authenticationStub } = makeSut()

    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(Promise.resolve(null))

    const httpRequest = makeFakeHttpRequest()

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(401)
    expect(httpResponse.body).toEqual(new UnauthorizedError())
  })
})
