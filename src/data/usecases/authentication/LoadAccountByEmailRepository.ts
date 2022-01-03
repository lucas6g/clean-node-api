import { Account } from '../../../domain/entities/Account'

export interface LoadAccountByEmailRepository {
    getByEmail: (email: string) => Promise<Account | null>
}
