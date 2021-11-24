import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { LogMongoRepository } from './LogMongoRepository'

describe('LogMongoRepository ', () => {
  let errorCollection: Collection

  beforeAll(async () => {
    await MongoHelper.connect(String(process.env.MONGO_URL))
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    errorCollection = await MongoHelper.getCollection('errors')
    await errorCollection.deleteMany({})
  })

  test('should create a log error on success', async () => {
    const sut = new LogMongoRepository()
    await sut.save('anyStack')
    const count = await errorCollection.countDocuments()

    expect(count).toBe(1)
  })
})
