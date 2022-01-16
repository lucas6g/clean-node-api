import { SaveSurveyRepository } from '../../../../data/protocols/db/survey/SaveSurveyRepository'
import { CreateSurveyModel } from '../../../../domain/usecases/CreateSurvey'
import { MongoHelper } from '../helpers/mongo-helper'

export class SurveyMongoRepository implements SaveSurveyRepository {
    async save(surveyData: CreateSurveyModel): Promise<void> {
        const surveyCollection = await MongoHelper.getCollection('surveys')


        await surveyCollection.insertOne(surveyData)


    }


}
