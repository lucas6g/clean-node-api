import { SignupController } from '../controllers/SignupController'

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
    const httpResonse = sut.handle(httpRequest)

    expect(httpResonse.statusCode).toBe(400)
  })
})
