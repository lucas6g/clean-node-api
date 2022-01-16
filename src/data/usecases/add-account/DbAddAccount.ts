
import { Account } from '../../../domain/entities/Account'
import { AddAccount, AddAccountModel } from '../../../domain/usecases/AddAccount'
import { Hasher } from '../../protocols/cryptography/Hasher'
import { LoadAccountByEmailRepository } from '../authentication/LoadAccountByEmailRepository'
import { AddAccountRepository } from './AddAccountRepository'

export class DbAddAccount implements AddAccount {
  private readonly hasher: Hasher
  private readonly addAccountRepository: AddAccountRepository
  private readonly loadAccountByEmailRespository: LoadAccountByEmailRepository


  constructor(
    hasher: Hasher,
    addAccountRepository: AddAccountRepository,
    loadAccountByEmailRespository: LoadAccountByEmailRepository
  ) {
    this.hasher = hasher
    this.addAccountRepository = addAccountRepository
    this.loadAccountByEmailRespository = loadAccountByEmailRespository
  }

  async add(accountData: AddAccountModel): Promise<Account | null> {
    const isEmailInUse = await this.loadAccountByEmailRespository.getByEmail(accountData.email)

    if (isEmailInUse) {
      return null
    }
    const hasherPassword = await this.hasher.hash(accountData.password)


    const account = await this.addAccountRepository.save(Object.assign({}, accountData, { password: hasherPassword }))

    return account
  }
}
