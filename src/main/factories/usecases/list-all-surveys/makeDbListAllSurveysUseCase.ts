
import { DbListAllSurveys } from '../../../../data/usecases/list-all-surveys/DbListAllSurveys'
import { ListAllSurveys } from '../../../../domain/usecases/ListAllSurveys'
import { SurveyMongoRepository } from '../../../../infra/db/mongodb/survey/SurveyMongoRepository'

export const makeDbListAllSurveysUseCase = (): ListAllSurveys => {
    const surveyRepository = new SurveyMongoRepository()

    return new DbListAllSurveys(surveyRepository)
}
