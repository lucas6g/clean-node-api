import { AddAccount } from '../../../domain/usecases/AddAccount'
import { InvalidParamError } from '../../errors/InvalidEmailError'
import { MissingParamError } from '../../errors/MissingParamError'

import { badRequest, serverError } from '../../helpers/httpHelper'
import { Controller } from '../../protocols/Controller'
import { EmailValidator } from './EmailValidator'
import { HttpRequest, HttpResponse } from '../../protocols/Http'

export class SignupController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount

  constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  handle (httpRequest: HttpRequest): HttpResponse | any {
    try {
      const { name, email, passwordConfirmation, password } = httpRequest.body

      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }
      const isValidEmail = this.emailValidator.isValid(email)

      if (!isValidEmail) {
        return badRequest(new InvalidParamError('email'))
      }

      this.addAccount.add({
        name,
        email,
        password
      })
    } catch (error) {
      return serverError()
    }
  }
}
