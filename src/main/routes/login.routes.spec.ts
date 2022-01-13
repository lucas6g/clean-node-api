
import { hash } from 'bcrypt'
import { Collection } from 'mongodb'
import request from 'supertest'

import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { app } from '../config/app'

describe('Login Routes', () => {
  let accountCollection: Collection

  beforeAll(async () => {
    await MongoHelper.connect(String(process.env.MONGO_URL))
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')

    const password = await hash('123', 12)

    await accountCollection.insertOne({
      name: 'lucas',
      email: 'lucas@gmail.com',
      password
    })
  })

  afterEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /signup', () => {
    test('should return 201  on signup', async () => {
      const response = await request(app).post('/signup').send({
        name: 'pedro',
        email: 'pietro@gmail.com',
        password: '123',
        passwordConfirmation: '123'
      })

      expect(response.status).toBe(201)
    })
  })
  describe('POST /login', () => {
    test('should return 200 on login', async () => {
      const response = await request(app).post('/login').send({
        email: 'lucas@gmail.com',
        password: '123'
      })
      expect(response.status).toBe(200)
    })
    test('should return 401 on login fails', async () => {
      const response = await request(app).post('/login').send({
        email: 'wrongEmail@gmail.com',
        password: 'invalidPassword'
      })
      expect(response.status).toBe(401)
    })
  })
})
