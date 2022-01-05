
import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { app } from '../config/app'

describe('Login Routes', () => {
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

  describe('POST /signup', () => {
    test('should return 201  on signup', async () => {
      const response = await request(app).post('/signup').send({
        name: 'lucas',
        email: 'lucas@gmail.com',
        password: '123',
        passwordConfirmation: '123'
      })

      expect(response.status).toBe(201)
    })
  })
})
