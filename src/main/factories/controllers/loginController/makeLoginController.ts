



import { Controller } from '../../../../presentation/protocols/Controller'


import { makeLoginValidation } from './makeLoginValidation'
import { makeDbAuthenticationUseCase } from '../../usecases/authentication/makeDbAuthenticationUseCase'
import { makeLogControllerDecorator } from '../../decorators/makeLogControllerDecorator'
import { LoginController } from '../../../../presentation/controllers/login/LoginController/LoginController'

// padra de projeto factory
export const makeLoginController = (): Controller => {


    const signUpController = new LoginController(makeDbAuthenticationUseCase(), makeLoginValidation())

    return makeLogControllerDecorator(signUpController)
}
