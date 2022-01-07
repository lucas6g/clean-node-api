
import { Authentication } from '../../../domain/usecases/Authentication'

import { badRequest, ok, serverError, unauthorized } from '../../helpers/http/httpHelper'
import { Validation } from '../../protocols/Validation'
import { Controller } from '../../protocols/Controller'
import { HttpRequest } from '../../protocols/HttpRequest'
import { HttpResponse } from '../../protocols/HttpResponse'

export class LoginController implements Controller {
  private readonly authentication: Authentication
  private readonly validation: Validation

  constructor(authentication: Authentication, validation: Validation) {
    this.authentication = authentication
    this.validation = validation
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)

      if (error) {
        return badRequest(error)
      }

      const { email, password } = httpRequest.body

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
