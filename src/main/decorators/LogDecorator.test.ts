
import { LogErrorRepository } from '../../data/protocols/LogErrorRepository'
import { serverError } from '../../presentation/helpers/httpHelper'
import { Controller } from '../../presentation/protocols/Controller'
import { HttpRequest, HttpResponse } from '../../presentation/protocols/Http'
import { LogControllerDecorator } from './LogDecorator'

const makeControllerStub = (): Controller => {
  class ControllerStub implements Controller {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
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
    async save (stack: string): Promise<void> {
      return await Promise.resolve()
    }
  }

  return new LogErrorRepositoryStub()
}

interface SutTypes {
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

// integracao do decorator com o controller

describe('LogController Decorator', () => {
  test('should call controller handle', async () => {
    const { sut, controllerStub } = makeSut()
    const httpRequest = {

      body: {
        name: 'anyName',
        email: 'anyEmail@mail.com',
        password: 'anyPassword',
        passwordConfirmation: 'anyPassword'

      }

    }

    const handleSpy = jest.spyOn(controllerStub, 'handle')

    await sut.handle(httpRequest)

    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })
  test('should return  the same result of the controller', async () => {
    const { sut } = makeSut()
    const httpRequest = {

      body: {
        name: 'anyName',
        email: 'anyEmail@mail.com',
        password: 'anyPassword',
        passwordConfirmation: 'anyPassword'

      }

    }

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

    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(Promise.resolve(error))
    const logSpy = jest.spyOn(logErrorRepositoryStub, 'save').mockReturnValueOnce(Promise.resolve())

    const httpRequest = {

      body: {
        name: 'anyName',
        email: 'anyEmail@mail.com',
        password: 'anyPassword',
        passwordConfirmation: 'anyPassword'

      }

    }

    await sut.handle(httpRequest)
    expect(logSpy).toHaveBeenCalledWith('anyStack')
  })
})
