
import { DbAuthentication } from '../../../../data/usecases/authentication/DbAuthentication'
import { BcryptAdpter } from '../../../../infra/cryptography/bcrypt-adpter/BcryptAdpter'
import { JwtAdpter } from '../../../../infra/cryptography/jwt-adpter/JwtAdpter'
import { AccountMongoRepository } from '../../../../infra/db/mongodb/account/AccountMongoRepository'

import env from '../../../config/env'

import { Authentication } from '../../../../domain/usecases/Authentication'

// padra de projeto factory
export const makeDbAuthenticationUseCase = (): Authentication => {
    const salt = 12
    const accountMongoRepository = new AccountMongoRepository()
    const bcryptAdpter = new BcryptAdpter(salt)
    const jwtAdpter = new JwtAdpter(env.jwtSecret)

    return new DbAuthentication(accountMongoRepository, bcryptAdpter, jwtAdpter, accountMongoRepository)
}
