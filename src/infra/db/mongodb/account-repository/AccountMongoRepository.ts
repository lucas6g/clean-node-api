import { AddAccountRepository } from '../../../../data/usecases/add-account/AddAccountRepository'
import { Account } from '../../../../domain/entities/Account'
import { AddAccountModel } from '../../../../domain/usecases/AddAccount'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async save (accountData: AddAccountModel): Promise<Account> {
    const accountCollection = await MongoHelper.getCollection('accounts')

    const result = await accountCollection.insertOne(accountData)

    const insertedId = String(result.insertedId)

    const account = {
      id: insertedId,
      ...accountData
    }

    return account
  }
}
