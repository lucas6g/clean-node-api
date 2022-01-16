import { Account } from '../../../domain/entities/Account'
import { AddAccountModel } from '../../../domain/usecases/AddAccount'

export interface AddAccountRepository {
  save: (account: AddAccountModel) => Promise<Account>
}
