
import { DbVerifyPermition } from '../../../../data/usecases/verify-permition/DbVerifyPermition'
import { VerifyPermition } from '../../../../domain/usecases/VerifyPermition'
import { AccountMongoRepository } from '../../../../infra/db/mongodb/account/AccountMongoRepository'

export const makeDbVerifyPermitionUseCase = (): VerifyPermition => {
    const accountRepository = new AccountMongoRepository()

    return new DbVerifyPermition(accountRepository)
}
