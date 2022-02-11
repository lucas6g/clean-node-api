
import { Authentication } from '../../../../domain/usecases/Authentication'
import { ServerError } from '../../../errors/ServerError'
import { UnauthorizedError } from '../../../errors/UnauthorizedError'
import { HttpRequest } from '../../../protocols/HttpRequest'
import { Validation } from '../../../protocols/Validation'
import { LoginController } from './LoginController'
const makeValidationStub = (): Validation => {
  // dependencia mockada
  class ValidationStub implements Validation {
    validate(input: any): Error | null {
      return null
    }
  }
  return new ValidationStub()
}
const makeAuthenticationStub = (): Authentication => {
  // dependencia mockada
  class AuthenticationStub implements Authentication {
    async auth(email: string, password: string): Promise<string> {
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

type SutTypes = {
  sut: LoginController
  validationStub: Validation
  authenticationStub: Authentication
}

const makeSut = (): SutTypes => {
  const authenticationStub = makeAuthenticationStub()
  const validationStub = makeValidationStub()
  const sut = new LoginController(authenticationStub, validationStub)
  return {
    sut,
    validationStub,
    authenticationStub

  }
}

describe('Login Controller', () => {
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
  test('should return 500 Authentication trows error', async () => {
    const { sut, authenticationStub } = makeSut()

    jest.spyOn(authenticationStub, 'auth').mockImplementationOnce(async () => {
      throw new Error()
    })

    const httpRequest = makeFakeHttpRequest()

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError(httpResponse.body.stack))
  })
  test('should return 200  if valid credentials are provided', async () => {
    const { sut } = makeSut()

    const httpRequest = makeFakeHttpRequest()

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toBe('anyToken')
  })
  test('should call Validation whit correct value', async () => {
    const { sut, validationStub } = makeSut()

    const validateSpy = jest.spyOn(validationStub, 'validate')

    const httpRequest = makeFakeHttpRequest()

    await sut.handle(httpRequest)

    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })
  test('should return 400 if Validation return error', async () => {
    const { sut, validationStub } = makeSut()

    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())

    const httpRequest = makeFakeHttpRequest()

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error())
  })
})
