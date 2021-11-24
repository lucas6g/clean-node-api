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

interface SutTypes {
  sut: LogControllerDecorator
  controllerStub: Controller

}

const makeSut = (): SutTypes => {
  const controllerStub = makeControllerStub()
  const sut = new LogControllerDecorator(controllerStub)

  return {
    sut,
    controllerStub

  }
}
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
})
