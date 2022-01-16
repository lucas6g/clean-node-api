import { DbCreateSurvey } from "../../../../data/usecases/create-survey/DbCreateSurvey";
import { CreateSurvey } from "../../../../domain/usecases/CreateSurvey";
import { SurveyMongoRepository } from "../../../../infra/db/mongodb/survey/SurveyMongoRepository";


export const makeDbCreateSurveyUseCase = (): CreateSurvey => {

    const surveyRepository = new SurveyMongoRepository()

    return new DbCreateSurvey(surveyRepository)

}