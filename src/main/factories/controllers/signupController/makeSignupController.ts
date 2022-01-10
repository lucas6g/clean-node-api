

import { SignupController } from '../../../../presentation/controllers/SignupController/SignupController'

import { Controller } from '../../../../presentation/protocols/Controller'

import { makeLogControllerDecorator } from '../../decorators/makeLogControllerDecorator'
import { makeDbAddAccountUseCase } from '../../usecases/add-account/makeDbAddAccountUseCase'
import { makeDbAuthenticationUseCase } from '../../usecases/authentication/makeDbAuthenticationUseCase'
import { makeSignupValidation } from './makeSignupValidation'

// padra de projeto factory
export const makeSignupController = (): Controller => {



  const signUpController = new SignupController(makeDbAddAccountUseCase(), makeSignupValidation(), makeDbAuthenticationUseCase())

  return makeLogControllerDecorator(signUpController)
}
