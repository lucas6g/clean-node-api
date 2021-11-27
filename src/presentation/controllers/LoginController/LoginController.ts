import { MissingParamError } from '../../errors/MissingParamError'
import { badRequest } from '../../helpers/httpHelper'
import { Controller } from '../../protocols/Controller'
import { HttpRequest, HttpResponse } from '../../protocols/Http'
import { EmailValidator } from '../SignupController/protocols/EmailValidator'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.email) {
      return await Promise.resolve(badRequest(new MissingParamError('email')))
    }
    if (!httpRequest.body.password) {
      return await Promise.resolve(badRequest(new MissingParamError('password')))
    }
    this.emailValidator.isValid(httpRequest.body.email)

    return await Promise.resolve({ body: {}, statusCode: 200 })
  }
}
