import { DbAddAccount } from '../../data/usecases/add-account/DbAddAccount'
import { BcryptAdpter } from '../../infra/cryptography/BcryptAdpter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/AccountMongoRepository'
import { LogMongoRepository } from '../../infra/db/mongodb/log-repository/LogMongoRepository'
import { SignupController } from '../../presentation/controllers/SignupController/SignupController'
import { RequeiredFieldValidation } from '../../presentation/helpers/validators/RequiredFieldValidation'
import { ValidationComposite } from '../../presentation/helpers/validators/ValidationComposite'
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

  const requiredFieldValidation = new RequeiredFieldValidation('email')

  const validationComposite = new ValidationComposite([
    requiredFieldValidation
  ])

  const logMongoRepository = new LogMongoRepository()
  const signUpController = new SignupController(emailValidatorAdpter, dbAddAccount, validationComposite)

  return new LogControllerDecorator(signUpController, logMongoRepository)
}
