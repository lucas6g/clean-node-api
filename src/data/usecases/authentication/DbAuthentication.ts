import { Authentication } from '../../../domain/usecases/Authentication'
import { HashComparer } from '../../protocols/cryptography/HashComparer'
import { LoadAccountByEmailRepository } from './LoadAccountByEmailRepository'

export class DbAuthentication implements Authentication {
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
    private readonly hashComparer: HashComparer

    constructor(loadAccountByEmailRepository: LoadAccountByEmailRepository, hashComparer: HashComparer) {
        this.loadAccountByEmailRepository = loadAccountByEmailRepository
        this.hashComparer = hashComparer
    }

    async auth(email: string, password: string): Promise<string | null> {
        const account = await this.loadAccountByEmailRepository.getByEmail(email)
        if (!account) {
            return null
        }
        await this.hashComparer.compare(password, account.password)

        return ''
    }
}
