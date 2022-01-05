
import { DbAuthentication } from '../../../data/usecases/authentication/DbAuthentication'
import { BcryptAdpter } from '../../../infra/cryptography/bcrypt-adpter/BcryptAdpter'
import { JwtAdpter } from '../../../infra/cryptography/jwt-adpter/JwtAdpter'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account/AccountMongoRepository'

import env from '../../config/env'
import { LogMongoRepository } from '../../../infra/db/mongodb/log/LogMongoRepository'
import { LoginController } from '../../../presentation/controllers/LoginController/LoginController'

import { Controller } from '../../../presentation/protocols/Controller'

import { LogControllerDecorator } from '../../decorators/LogControllerDecorator'
import { makeLoginValidation } from './makeLoginValidation'

// padra de projeto factory
export const makeLoginController = (): Controller => {
    const salt = 12
    const accountMongoRepository = new AccountMongoRepository()
    const bcryptAdpter = new BcryptAdpter(salt)
    const jwtAdpter = new JwtAdpter(env.jwtSecret)

    const dbAuthentication = new DbAuthentication(accountMongoRepository, bcryptAdpter, jwtAdpter, accountMongoRepository)

    const logMongoRepository = new LogMongoRepository()
    const signUpController = new LoginController(dbAuthentication, makeLoginValidation())

    return new LogControllerDecorator(signUpController, logMongoRepository)
}
