import { VerifyPermition } from '../../../domain/usecases/VerifyPermition'
import { LoadAccountByIdRepository } from '../../protocols/db/account/LoadAccountByIdRepository'

export class DbVerifyPermition implements VerifyPermition {


    private readonly loadAccountByIdRespository: LoadAccountByIdRepository

    constructor(loadAccountByIdRespository: LoadAccountByIdRepository) {
        this.loadAccountByIdRespository = loadAccountByIdRespository
    }


    async verify(accountId: string, role: string): Promise<boolean> {

        const account = await this.loadAccountByIdRespository.loadById(accountId)

        if (!account) {
            return false
        }

        if (account.role !== role) {
            return false
        }



        return Promise.resolve(true)

    }
}