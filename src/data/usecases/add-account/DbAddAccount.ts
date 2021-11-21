
import { Account } from '../../../domain/entities/Account'
import { AddAccount, AddAccountModel } from '../../../domain/usecases/AddAccount'
import { Encrypter } from '../../protocols/Encrypter'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter

  constructor (encrypter: Encrypter) {
    this.encrypter = encrypter
  }

  async add (account: AddAccountModel): Promise<Account> {
    await this.encrypter.encrypt(account.password)

    return await new Promise(resolve => resolve({
      id: '',
      name: '',
      email: '',
      password: ''
    }))
  }
}
