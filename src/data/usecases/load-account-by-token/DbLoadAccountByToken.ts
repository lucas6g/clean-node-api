import { Account } from "../../../domain/entities/Account";
import { LoadAccountByToken } from "../../../domain/usecases/LoadAccountByToken";
import { TokenVerifier } from "../../protocols/cryptography/TokenVerifier";
import { LoadAccountByTokenRepository } from "../../protocols/db/account/LoadAccountByTokenRepository";


export class DbLoadAccountByToken implements LoadAccountByToken {

    private readonly tokenVerifier: TokenVerifier
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository

    constructor(tokenVerifier: TokenVerifier, loadAccountByTokenRepository: LoadAccountByTokenRepository) {
        this.loadAccountByTokenRepository = loadAccountByTokenRepository
        this.tokenVerifier = tokenVerifier
    }

    async getByToken(token: string, role?: string): Promise<Account | null> {

        const verifiedToken = await this.tokenVerifier.verify(token)

        if (!verifiedToken) {
            return null
        }
        const account = await this.loadAccountByTokenRepository.loadByToken(token, role)

        if (!account) {
            return null
        }

        return account
    }

}