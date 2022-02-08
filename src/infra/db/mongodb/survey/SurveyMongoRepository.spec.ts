import { Collection } from 'mongodb'

import { MongoHelper } from '../helpers/mongo-helper'
import { SurveyMongoRepository } from './SurveyMongoRepository'

describe('Survey Mongo Repository', () => {
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

    const makeSut = (): SurveyMongoRepository => {
        return new SurveyMongoRepository()
    }

    test('should save an survey on success', async () => {
        const sut = makeSut()

        await sut.save({

            question: 'anyQuestion',
            answers: [{
                image: 'anyImage',
                answer: 'anyAnswer'
            }],
            date: new Date()

        })

        const survey = await surveyCollection.findOne({
            question: 'anyQuestion'
        })

        expect(survey).toBeTruthy()
    })
    test('should returns  an list of surveys on succsess', async () => {
        const sut = makeSut()

        await surveyCollection.insertOne({

            question: 'anyQuestion',
            answers: [{
                image: 'anyImage',
                answer: 'anyAnswer'
            }],
            date: new Date(2022, 1, 7, 14)

        })
        const surveys = await sut.loadAll()

        expect(surveys.length).toBe(1)
        expect(surveys[0].question).toBe('anyQuestion')
    })
})
