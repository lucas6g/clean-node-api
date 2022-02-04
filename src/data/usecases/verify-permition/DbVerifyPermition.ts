import { VerifyPermition } from '../../../domain/usecases/VerifyPermition'
import { LoadAccountByIdRepository } from '../../protocols/db/account/LoadAccountByIdRepository'

export class DbVerifyPermition implements VerifyPermition {


    private readonly loadAccountByIdRespository: LoadAccountByIdRepository

    constructor(loadAccountByIdRespository: LoadAccountByIdRepository) {
        this.loadAccountByIdRespository = loadAccountByIdRespository
    }


    async verify(accountId: string, role: string): Promise<boolean> {

        await this.loadAccountByIdRespository.loadById(accountId)

        return Promise.resolve(true)

    }
}