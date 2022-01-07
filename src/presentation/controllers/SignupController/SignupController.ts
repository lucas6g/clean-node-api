import { AddAccount } from '../../../domain/usecases/AddAccount'

import { badRequest, created, serverError } from '../../helpers/http/httpHelper'
import { Controller } from '../../protocols/Controller'

import { HttpRequest } from '../../protocols/HttpRequest'
import { HttpResponse } from '../../protocols/HttpResponse'
import { Validation } from '../../protocols/Validation'

export class SignupController implements Controller {
  private readonly addAccount: AddAccount
  private readonly validation: Validation

  constructor(addAccount: AddAccount, validation: Validation) {
    this.addAccount = addAccount
    this.validation = validation
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

      return created(account)
    } catch (error) {
      return serverError(error)
    }
  }
}
