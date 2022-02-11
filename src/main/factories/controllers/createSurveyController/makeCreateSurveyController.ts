import { CreateSurveyController } from '../../../../presentation/controllers/survey/CreateSurveyController/CreateSurveyController'
import { Controller } from '../../../../presentation/protocols/Controller'
import { makeLogControllerDecorator } from '../../decorators/makeLogControllerDecorator'
import { makeDbCreateSurveyUseCase } from '../../usecases/create-survey/makeDbCreateSurveyUseCase'
import { makeCreateSurveyValidation } from './makeCreateSurveyValidation'

export const makeCreateSurveyController = (): Controller => {
    const createSurveyController = new CreateSurveyController(makeCreateSurveyValidation(), makeDbCreateSurveyUseCase())

    return makeLogControllerDecorator(createSurveyController)
}
