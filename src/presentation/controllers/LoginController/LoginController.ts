import { InvalidParamError } from '../../errors/InvalidEmailError'
import { MissingParamError } from '../../errors/MissingParamError'
import { badRequest, serverError } from '../../helpers/httpHelper'
import { Controller } from '../../protocols/Controller'
import { HttpRequest, HttpResponse } from '../../protocols/Http'
import { EmailValidator } from '../SignupController/protocols/EmailValidator'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email', 'password']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const isValid = this.emailValidator.isValid(httpRequest.body.email)

      if (!isValid) {
        return await Promise.resolve(badRequest(new InvalidParamError('email')))
      }

      return await Promise.resolve({ body: {}, statusCode: 200 })
    } catch (error) {
      return serverError(error)
    }
  }
}
