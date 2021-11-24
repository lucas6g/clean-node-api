import { DbAddAccount } from '../../data/usecases/add-account/DbAddAccount'
import { BcryptAdpter } from '../../infra/cryptography/BcryptAdpter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/AccountMongoRepository'
import { SignupController } from '../../presentation/controllers/SignupController/SignupController'
import { Controller } from '../../presentation/protocols/Controller'

import { EmailValidatorAdpter } from '../../utils/EmailValidatorAdpter'
import { LogControllerDecorator } from '../decorators/LogDecorator'

// padra de projeto factory
export const makeSignupController = (): Controller => {
  const emailValidatorAdpter = new EmailValidatorAdpter()
  const salt = 12
  const accountMongoRepository = new AccountMongoRepository()
  const bcryptAdpter = new BcryptAdpter(salt)
  const dbAddAccount = new DbAddAccount(bcryptAdpter, accountMongoRepository)

  const signUpController = new SignupController(emailValidatorAdpter, dbAddAccount)
  return new LogControllerDecorator(signUpController)
}
