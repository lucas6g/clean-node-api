import { Account } from "../../../../domain/entities/Account";

export interface LoadAccountByTokenRepository {

    loadByToken: (token: string) => Promise<Account | null>
}
