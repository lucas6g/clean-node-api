import { WithId, ObjectId } from 'mongodb'
import { UpdateTokenRepository } from '../../../../data/protocols/db/UpdateTokenRepository'
import { AddAccountRepository } from '../../../../data/usecases/add-account/AddAccountRepository'
import { LoadAccountByEmailRepository } from '../../../../data/usecases/authentication/LoadAccountByEmailRepository'
import { Account } from '../../../../domain/entities/Account'
import { AddAccountModel } from '../../../../domain/usecases/AddAccount'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateTokenRepository {
  async save(accountData: AddAccountModel): Promise<Account> {
    const accountCollection = await MongoHelper.getCollection('accounts')

    const result = await accountCollection.insertOne(accountData)

    const insertedId = String(result.insertedId)

    const account = {
      id: insertedId,
      ...accountData
    }

    return account
  }

  async getByEmail(email: string): Promise<Account | null> {
    const accountCollection = await MongoHelper.getCollection('accounts')

    const result = await accountCollection.findOne<WithId<Account>>({ email })

    if (!result) {
      return null
    }

    const account = {
      id: String(result._id),
      name: result.name,
      email: result.email,
      password: result.password
    }

    return account
  }

  async updateToken(id: string, token: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.updateOne({ _id: new ObjectId(id) }, {
      $set: {
        // eslint-disable-next-line quote-props
        token
      }
    })
  }
}
