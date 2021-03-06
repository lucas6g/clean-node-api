import { Collection, InsertOneResult } from 'mongodb'
import { Account } from '../../../../domain/entities/Account'

import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './AccountMongoRepository'

describe('Account Mongo Repository', () => {
  let accountCollection: Collection
  let insertResult: InsertOneResult<Account>

  beforeAll(async () => {
    await MongoHelper.connect(String(process.env.MONGO_URL))
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')

    insertResult = await accountCollection.insertOne({

      name: 'anyName',
      email: 'anyMail@mail.com',
      password: 'anyPassword',
      token: 'anyToken',
      role: 'anyRole'
    })
  })
  afterEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  const makeSut = (): AccountMongoRepository => {
    return new AccountMongoRepository()
  }

  test('should return an account on save succses', async () => {
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
  test('should return an account on getByEmail succses', async () => {
    const sut = makeSut()

    const account = await sut.getByEmail('anyMail@mail.com')

    expect(account).toBeTruthy()
    expect(account?.id).toBeTruthy()
    expect(account?.name).toBe('anyName')
    expect(account?.email).toBe('anyMail@mail.com')
    expect(account?.password).toBe('anyPassword')
  })
  test('should return null on getByEmail fails', async () => {
    const sut = makeSut()

    const account = await sut.getByEmail('invalidMail@mail.com')

    expect(account).toBeNull()
  })
  test('should  update account token when calls updateToken', async () => {
    const sut = makeSut()

    await sut.updateToken(insertResult.insertedId.toString(), 'anyToken')

    const account = await accountCollection.findOne({ _id: insertResult.insertedId })

    expect(account?.token).toBe('anyToken')
  })
  test('should return an account on loadByToken succsses ', async () => {
    const sut = makeSut()

    const account = await sut.loadByToken('anyToken')

    expect(account).toBeTruthy()
    expect(account?.id).toBeTruthy()
    expect(account?.name).toBe('anyName')
    expect(account?.email).toBe('anyMail@mail.com')
    expect(account?.password).toBe('anyPassword')
  })

  test('should return null on loadByToken fails', async () => {
    const sut = makeSut()

    const account = await sut.loadByToken('invalidToken')

    expect(account).toBeNull()
  })

  test('should return an account on loadById succses', async () => {
    const sut = makeSut()

    const account = await sut.loadById(insertResult.insertedId.toString())

    expect(account).toBeTruthy()
    expect(account?.id).toBeTruthy()
    expect(account?.name).toBe('anyName')
    expect(account?.email).toBe('anyMail@mail.com')
    expect(account?.password).toBe('anyPassword')
    expect(account?.role).toBe('anyRole')
  })

  test('should return null on loadById fails', async () => {
    const sut = makeSut()

    const account = await sut.loadById('696e76616c696449646e666a')

    expect(account).toBeNull()
  })
})
