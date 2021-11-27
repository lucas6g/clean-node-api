import { MissingParamError } from '../../errors/MissingParamError'
import { badRequest } from '../../helpers/httpHelper'
import { Controller } from '../../protocols/Controller'
import { HttpRequest, HttpResponse } from '../../protocols/Http'

export class LoginController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    return await Promise.resolve(badRequest(new MissingParamError('email')))
  }
}
