import { Account } from "../entities/Account";

export interface LoadAccountByToken {

    getByToken: (token: string, role?: string) => Promise<Account>
}
