/* eslint-disable import/no-duplicates */
// eslint-disable-next-line import/no-duplicates
import { Account } from '../../../domain/entities/Account'
import { AddAccount, AddAccountModel } from '../../../domain/usecases/AddAccount'
import { Hasher } from '../../protocols/cryptography/Hasher'
import { AddAccountRepository } from './AddAccountRepository'

export class DbAddAccount implements AddAccount {
  private readonly hasher: Hasher
  private readonly addAccountRepository: AddAccountRepository

  constructor(hasher: Hasher, addAccountRepository: AddAccountRepository) {
    this.hasher = hasher
    this.addAccountRepository = addAccountRepository
  }

  async add(accountData: AddAccountModel): Promise<Account | null> {
    const hasherPassword = await this.hasher.hash(accountData.password)

    const account = await this.addAccountRepository.save(Object.assign({}, accountData, { password: hasherPassword }))

    return account
  }
}
