import { DbAddAccount } from '../../../data/usecases/add-account/DbAddAccount'
import { BcryptAdpter } from '../../../infra/cryptography/bcrypt-adpter/BcryptAdpter'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account/AccountMongoRepository'
import { LogMongoRepository } from '../../../infra/db/mongodb/log/LogMongoRepository'
import { SignupController } from '../../../presentation/controllers/SignupController/SignupController'

import { Controller } from '../../../presentation/protocols/Controller'

import { LogControllerDecorator } from '../../decorators/LogControllerDecorator'
import { makeSignupValidation } from './makeSignupValidation'

// padra de projeto factory
export const makeSignupController = (): Controller => {
  const salt = 12
  const accountMongoRepository = new AccountMongoRepository()
  const bcryptAdpter = new BcryptAdpter(salt)
  const dbAddAccount = new DbAddAccount(bcryptAdpter, accountMongoRepository)

  const logMongoRepository = new LogMongoRepository()
  const signUpController = new SignupController(dbAddAccount, makeSignupValidation())

  return new LogControllerDecorator(signUpController, logMongoRepository)
}
