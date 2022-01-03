import { AddAccount } from '../../../domain/usecases/AddAccount'
import { InvalidParamError } from '../../errors/InvalidEmailError'

import { badRequest, created, serverError } from '../../helpers/httpHelper'
import { Controller } from '../../protocols/Controller'
import { EmailValidator } from './protocols/EmailValidator'
import { HttpRequest, HttpResponse } from '../../protocols/Http'
import { Validation } from '../../helpers/validators/Validation'

export class SignupController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount
  private readonly validation: Validation

  constructor(emailValidator: EmailValidator, addAccount: AddAccount, validation: Validation) {
    this.emailValidator = emailValidator
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

      const isValidEmail = this.emailValidator.isValid(email)

      if (!isValidEmail) {
        return badRequest(new InvalidParamError('email'))
      }

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
