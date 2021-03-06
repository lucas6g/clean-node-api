import { Account } from '../entities/Account'

// dto
export type AddAccountModel = {
  name: string
  email: string
  password: string

}

export interface AddAccount {

  add: (account: AddAccountModel) => Promise<Account | null>
}
