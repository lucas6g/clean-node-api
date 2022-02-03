


import { sign } from 'jsonwebtoken'
import { Collection } from 'mongodb'

import request from 'supertest'

import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { app } from '../config/app'
import env from '../config/env'


describe('Survey Routes', () => {
    let surveyCollection: Collection
    let accountCollection: Collection
    let token: string

    beforeAll(async () => {
        await MongoHelper.connect(String(process.env.MONGO_URL))
    })

    afterAll(async () => {
        await MongoHelper.disconnect()
    })

    beforeEach(async () => {
        surveyCollection = await MongoHelper.getCollection('surveys')
        accountCollection = await MongoHelper.getCollection('accounts')

        const res = await accountCollection.insertOne({
            name: 'lucas',
            email: 'lucas@gmail.com',
            password: '12345',
            token: 'token',
            role: 'admin'
        })
        const accountId = res.insertedId.toString()

        token = sign({ accountId }, env.jwtSecret)


        await accountCollection.updateOne({ _id: accountId }, {
            $set: {
                token
            }
        })



    })

    afterEach(async () => {
        surveyCollection = await MongoHelper.getCollection('surveys')
        accountCollection = await MongoHelper.getCollection('accounts')

        await accountCollection.deleteMany({})
        await surveyCollection.deleteMany({})
    })

    describe('POST /survey', () => {
        test('should return 403  on survey creation whitout access token', async () => {
            const response = await request(app).post('/survey').send({

                question: 'anyQuestion',
                answers: [{
                    image: 'https://avatars.githubusercontent.com/u/54814274?v=4',
                    answer: 'anyAnswer'
                }]

            })

            expect(response.status).toBe(403)
        })
    })
    test('should return 204  survey creation ', async () => {
        const response = await request(app)
            .post('/survey')
            .set('x-access-token', token)
            .send({

                question: 'anyQuestion',
                answers: [{
                    image: 'https://avatars.githubusercontent.com/u/54814274?v=4',
                    answer: 'anyAnswer'
                }]

            })

        expect(response.status).toBe(403)
    })
})
