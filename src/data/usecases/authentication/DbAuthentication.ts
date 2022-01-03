import { Authentication } from '../../../domain/usecases/Authentication'
import { LoadAccountByEmailRepository } from './LoadAccountByEmailRepository'

export class DbAuthentication implements Authentication {
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository

    constructor(loadAccountByEmailRepository: LoadAccountByEmailRepository) {
        this.loadAccountByEmailRepository = loadAccountByEmailRepository
    }

    async auth(email: string, password: string): Promise<string | null> {
        await this.loadAccountByEmailRepository.getByEmail(email)

        return null
    }
}
