import { SignupController } from '../controllers/SignupController'
import { MissingParamError } from '../errors/MissingParamError'

describe('Signup Controller', () => {
  test('should return 400 if no name is provided', () => {
    const sut = new SignupController()
    const httpRequest = {
      body: {

        email: 'anyEmail@mail.com',
        password: 'anyPassword',
        passwordConfirmation: 'anyPassword'
      }
    }
    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })
  test('should return 400 if no email is provided', () => {
    const sut = new SignupController()
    const httpRequest = {
      body: {

        name: 'anyName',
        password: 'anyPassword',
        passwordConfirmation: 'anyPassword'
      }
    }
    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })
})
