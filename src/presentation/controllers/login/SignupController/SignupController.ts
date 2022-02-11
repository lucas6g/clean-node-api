
import { AddAccount } from '../../../../domain/usecases/AddAccount'
import { Authentication } from '../../../../domain/usecases/Authentication'
import { EmailInUseError } from '../../../errors/EmailInUseError'
import { badRequest, created, forbidden, serverError } from '../../../helpers/http/httpHelper'
import { Controller } from '../../../protocols/Controller'
import { HttpRequest } from '../../../protocols/HttpRequest'
import { HttpResponse } from '../../../protocols/HttpResponse'
import { Validation } from '../../../protocols/Validation'

export class SignupController implements Controller {
  private readonly addAccount: AddAccount
  private readonly validation: Validation
  private readonly authentication: Authentication

  constructor(addAccount: AddAccount, validation: Validation, authentication: Authentication) {
    this.addAccount = addAccount
    this.validation = validation
    this.authentication = authentication
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)

      if (error) {
        return badRequest(error)
      }

      const { name, email, password } = httpRequest.body

      const account = await this.addAccount.add({
        name,
        email,
        password
      })
      if (!account) {
        return forbidden(new EmailInUseError())
      }

      const token = await this.authentication.auth(account.email, password)

      return created({ token })
    } catch (error) {
      return serverError(error)
    }
  }
}
