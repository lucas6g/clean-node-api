import { InvalidParamError } from '../../errors/InvalidEmailError'
import { MissingParamError } from '../../errors/MissingParamError'
import { ServerError } from '../../errors/ServerError'
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
  test('should return 500 if EmailValidator trows error', async () => {
    const { sut, emailValidatorStub } = makeSut()

    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpRequest = makeFakeHttpRequest()

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.body).toEqual(new ServerError(httpResponse.body.stack))
  })
})
