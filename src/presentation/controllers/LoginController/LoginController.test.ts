import { MissingParamError } from '../../errors/MissingParamError'
import { LoginController } from './LoginController'

describe('Login Controller', () => {
  test('should return 400 if no email is provided', async () => {
    const sut = new LoginController()

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
    const sut = new LoginController()

    const httpRequest = {
      body: {
        email: 'anyEmail@mail.com'

      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.body).toEqual((new MissingParamError('password')))
    expect(httpResponse.statusCode).toBe(400)
  })
})
