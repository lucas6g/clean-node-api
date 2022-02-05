import { Account } from '../entities/Account'

export interface LoadAccountByToken {

    getByToken: (token: string) => Promise<Account | null>
}
