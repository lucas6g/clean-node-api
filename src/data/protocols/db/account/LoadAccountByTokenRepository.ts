import { Account } from "../../../../domain/entities/Account";

export interface LoadAccountByTokenRepository {

    getByToken: (token: string, role?: string) => Promise<Account>
}
