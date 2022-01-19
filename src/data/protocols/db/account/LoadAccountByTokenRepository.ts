import { Account } from "../../../../domain/entities/Account";

export interface LoadAccountByTokenRepository {

    loadByToken: (token: string, role?: string) => Promise<Account | null>
}
