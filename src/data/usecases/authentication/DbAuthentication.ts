import { Authentication } from '../../../domain/usecases/Authentication'
import { HashComparer } from '../../protocols/cryptography/HashComparer'
import { TokenGenerator } from '../../protocols/cryptography/TokenGenerator'
import { LoadAccountByEmailRepository } from './LoadAccountByEmailRepository'

export class DbAuthentication implements Authentication {
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
    private readonly hashComparer: HashComparer
    private readonly tokenGenerator: TokenGenerator

    constructor(
        loadAccountByEmailRepository: LoadAccountByEmailRepository,
        hashComparer: HashComparer,
        tokenGenerator: TokenGenerator
    ) {
        this.loadAccountByEmailRepository = loadAccountByEmailRepository
        this.hashComparer = hashComparer
        this.tokenGenerator = tokenGenerator
    }

    async auth(email: string, password: string): Promise<string | null> {
        const account = await this.loadAccountByEmailRepository.getByEmail(email)
        if (!account) {
            return null
        }
        const isValidPassword = await this.hashComparer.compare(password, account.password)
        if (!isValidPassword) {
            return null
        }
        const token = await this.tokenGenerator.generate(account.id)

        return token
    }
}
