import { Authentication } from '../../../domain/usecases/Authentication'
import { HashComparer } from '../../protocols/cryptography/HashComparer'
import { TokenGenerator } from '../../protocols/cryptography/TokenGenerator'
import { UpdateTokenRepository } from '../../protocols/db/account/UpdateTokenRepository'
import { LoadAccountByEmailRepository } from './LoadAccountByEmailRepository'

export class DbAuthentication implements Authentication {
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
    private readonly hashComparer: HashComparer
    private readonly tokenGenerator: TokenGenerator
    private readonly updatedTokenRepository: UpdateTokenRepository

    constructor(
        loadAccountByEmailRepository: LoadAccountByEmailRepository,
        hashComparer: HashComparer,
        tokenGenerator: TokenGenerator,
        updatedTokenRepository: UpdateTokenRepository
    ) {
        this.loadAccountByEmailRepository = loadAccountByEmailRepository
        this.hashComparer = hashComparer
        this.tokenGenerator = tokenGenerator
        this.updatedTokenRepository = updatedTokenRepository
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

        await this.updatedTokenRepository.updateToken(account.id, token)

        return token
    }
}
