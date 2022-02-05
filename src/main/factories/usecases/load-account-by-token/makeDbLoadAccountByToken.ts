import { DbLoadAccountByToken } from '../../../../data/usecases/load-account-by-token/DbLoadAccountByToken'
import { LoadAccountByToken } from '../../../../domain/usecases/LoadAccountByToken'
import { JwtAdpter } from '../../../../infra/cryptography/jwt-adpter/JwtAdpter'
import { AccountMongoRepository } from '../../../../infra/db/mongodb/account/AccountMongoRepository'
import env from '../../../config/env'
export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
    const tokenVerifier = new JwtAdpter(env.jwtSecret)
    const accountMongoRepository = new AccountMongoRepository()

    return new DbLoadAccountByToken(tokenVerifier, accountMongoRepository)
}
