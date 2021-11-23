import { DbAddAccount } from '../../data/usecases/add-account/DbAddAccount'
import { BcryptAdpter } from '../../infra/cryptography/BcryptAdpter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/AccountMongoRepository'
import { SignupController } from '../../presentation/controllers/SignupController/SignupController'
import { EmailValidatorAdpter } from '../../utils/EmailValidatorAdpter'

// padra de projeto factory
export const makeSignupController = (): SignupController => {
  const emailValidatorAdpter = new EmailValidatorAdpter()
  const salt = 12
  const accountMongoRepository = new AccountMongoRepository()
  const bcryptAdpter = new BcryptAdpter(salt)
  const dbAddAccount = new DbAddAccount(bcryptAdpter, accountMongoRepository)

  return new SignupController(emailValidatorAdpter, dbAddAccount)
}
