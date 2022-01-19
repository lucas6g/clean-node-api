import { Account } from "../../../domain/entities/Account";
import { LoadAccountByToken } from "../../../domain/usecases/LoadAccountByToken";
import { TokenVerifier } from "../../protocols/cryptography/TokenVerifier";


export class DbLoadAccountByToken implements LoadAccountByToken {

    private readonly tokenVerifier: TokenVerifier

    constructor(tokenVerifier: TokenVerifier) {
        this.tokenVerifier = tokenVerifier
    }

    async getByToken(token: string, role?: string): Promise<Account | null> {

        await this.tokenVerifier.verify(token)

        return Promise.resolve(null)
    }

}