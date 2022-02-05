import { DbAddAccount } from '../../../../data/usecases/add-account/DbAddAccount'
import { AddAccount } from '../../../../domain/usecases/AddAccount'
import { BcryptAdpter } from '../../../../infra/cryptography/bcrypt-adpter/BcryptAdpter'
import { AccountMongoRepository } from '../../../../infra/db/mongodb/account/AccountMongoRepository'

// padra de projeto factory
export const makeDbAddAccountUseCase = (): AddAccount => {
    const salt = 12
    const accountMongoRepository = new AccountMongoRepository()
    const bcryptAdpter = new BcryptAdpter(salt)

    return new DbAddAccount(bcryptAdpter, accountMongoRepository, accountMongoRepository)
}
