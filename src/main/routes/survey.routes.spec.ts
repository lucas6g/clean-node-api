

import { Collection } from 'mongodb'
import request from 'supertest'

import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { app } from '../config/app'

describe('Survey Routes', () => {
    let surveyCollection: Collection

    beforeAll(async () => {
        await MongoHelper.connect(String(process.env.MONGO_URL))
    })

    afterAll(async () => {
        await MongoHelper.disconnect()
    })

    beforeEach(async () => {
        surveyCollection = await MongoHelper.getCollection('surveys')


    })

    afterEach(async () => {
        surveyCollection = await MongoHelper.getCollection('surveys')
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

})
