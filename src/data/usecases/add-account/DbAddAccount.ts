
import { Account } from '../../../domain/entities/Account'
import { AddAccount, AddAccountModel } from '../../../domain/usecases/AddAccount'
import { Encrypter } from '../../protocols/Encrypter'
import { AddAccountRepository } from './AddAccountRepository'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter
  private readonly addAccountRepository: AddAccountRepository

  constructor (encrypter: Encrypter, addAccountRepository: AddAccountRepository) {
    this.encrypter = encrypter
    this.addAccountRepository = addAccountRepository
  }

  async add (account: AddAccountModel): Promise<Account> {
    const encryptedPassword = await this.encrypter.encrypt(account.password)

    await this.addAccountRepository.save(Object.assign({}, account, { password: encryptedPassword }))

    return await new Promise(resolve => resolve({
      id: '',
      name: '',
      email: '',
      password: ''
    }))
  }
}
