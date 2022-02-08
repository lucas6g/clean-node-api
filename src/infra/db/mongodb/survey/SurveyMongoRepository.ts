
import { LoadAllSurveysRepository } from '../../../../data/protocols/db/survey/LoadAllSurveysRepository'
import { SaveSurveyRepository } from '../../../../data/protocols/db/survey/SaveSurveyRepository'
import { Survey } from '../../../../domain/entities/Survey'
import { CreateSurveyModel } from '../../../../domain/usecases/CreateSurvey'
import { MongoHelper } from '../helpers/mongo-helper'

export class SurveyMongoRepository implements SaveSurveyRepository, LoadAllSurveysRepository {
    async save(surveyData: CreateSurveyModel): Promise<void> {
        const surveyCollection = await MongoHelper.getCollection('surveys')

        await surveyCollection.insertOne(surveyData)
    }

    async loadAll(): Promise<Survey[]> {
        const surveyCollection = await MongoHelper.getCollection('surveys')
        const surveys = await surveyCollection.find().toArray()

        const mapSurveys: Survey[] = surveys.map((survey) => {
            return {
                id: survey._id.toString(),
                answers: survey.answers,
                date: survey.date,
                question: survey.question,
                didAnswer: survey.didAnswer

            }
        })
        return mapSurveys
    }
}
