
import { LogErrorRepository } from '../../data/protocols/db/log/LogErrorRepository'
import { serverError } from '../../presentation/helpers/http/httpHelper'
import { Controller } from '../../presentation/protocols/Controller'
import { HttpRequest } from '../../presentation/protocols/HttpRequest'
import { HttpResponse } from '../../presentation/protocols/HttpResponse'

import { LogControllerDecorator } from './LogControllerDecorator'

const makeControllerStub = (): Controller => {
  class ControllerStub implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
      const httpResponse = {
        statusCode: 200,
        body: {
          name: 'lucas'
        }
      }
      return await new Promise((resolve) => { resolve(httpResponse) })
    }
  }

  return new ControllerStub()
}

const makeLogErrorRepository = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async save(stack: string): Promise<void> {
      return await Promise.resolve()
    }
  }

  return new LogErrorRepositoryStub()
}

type SutTypes = {
  sut: LogControllerDecorator
  controllerStub: Controller
  logErrorRepositoryStub: LogErrorRepository

}

const makeSut = (): SutTypes => {
  const controllerStub = makeControllerStub()
  const logErrorRepositoryStub = makeLogErrorRepository()
  const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)

  return {
    sut,
    controllerStub,
    logErrorRepositoryStub

  }
}

const makeFakeHttpRequest = (): HttpRequest => {
  return {
    body: {
      name: 'anyName',
      email: 'anyEmail@mail.com',
      password: 'anyPassword',
      passwordConfirmation: 'anyPassword'

    }
  }
}

// integracao do decorator com o controller

describe('LogController Decorator', () => {
  test('should call controller handle', async () => {
    const { sut, controllerStub } = makeSut()
    const httpRequest = makeFakeHttpRequest()

    const handleSpy = jest.spyOn(controllerStub, 'handle')

    await sut.handle(httpRequest)

    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })
  test('should return  the same result of the controller', async () => {
    const { sut } = makeSut()
    const httpRequest = makeFakeHttpRequest()

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual({
      statusCode: 200,
      body: {
        name: 'lucas'
      }
    })
  })
  test('should call Log Error Repository  whit correct error if controller returns server error', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut()
    const fakeError = new Error()
    fakeError.stack = 'anyStack'
    const error = serverError(fakeError)

    // metodo handle retorna um erro
    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(Promise.resolve(error))

    const logSpy = jest.spyOn(logErrorRepositoryStub, 'save').mockReturnValueOnce(Promise.resolve())

    const httpRequest = makeFakeHttpRequest()

    await sut.handle(httpRequest)
    expect(logSpy).toHaveBeenCalledWith('anyStack')
  })
})
