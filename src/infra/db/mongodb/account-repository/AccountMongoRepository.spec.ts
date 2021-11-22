import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './AccountMongoRepository'

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(String(process.env.MONGO_URL))
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  const makeSut = (): AccountMongoRepository => {
    return new AccountMongoRepository()
  }

  test('should return an account on succses', async () => {
    const sut = makeSut()

    const account = await sut.save({
      name: 'anyName',
      email: 'anyMail@mail.com',
      password: 'anyPassword'
    })

    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('anyName')
    expect(account.email).toBe('anyMail@mail.com')
    expect(account.password).toBe('anyPassword')
  })
})
