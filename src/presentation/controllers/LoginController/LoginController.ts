
import { Authentication } from '../../../domain/usecases/Authentication'

import { InvalidParamError } from '../../errors/InvalidEmailError'
import { MissingParamError } from '../../errors/MissingParamError'
import { badRequest, ok, serverError, unauthorized } from '../../helpers/httpHelper'
import { Controller } from '../../protocols/Controller'
import { HttpRequest, HttpResponse } from '../../protocols/Http'
import { EmailValidator } from '../SignupController/protocols/EmailValidator'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly authentication: Authentication

  constructor (emailValidator: EmailValidator, authentication: Authentication) {
    this.emailValidator = emailValidator
    this.authentication = authentication
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email', 'password']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { email, password } = httpRequest.body
      const isValid = this.emailValidator.isValid(email)

      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      const token = await this.authentication.auth(email, password)

      if (!token) {
        return unauthorized()
      }

      return ok(token)
    } catch (error) {
      return serverError(error)
    }
  }
}
