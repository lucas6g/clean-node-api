import { Account } from '../../../../domain/entities/Account'

export interface LoadAccountByIdRepository {

    loadById: (accountId: string) => Promise<Account | null>
}
