
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

  async add (accountData: AddAccountModel): Promise<Account> {
    const encryptedPassword = await this.encrypter.encrypt(accountData.password)

    const account = await this.addAccountRepository.save(Object.assign({}, accountData, { password: encryptedPassword }))

    return account
  }
}
