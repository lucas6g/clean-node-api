
import { ListAllSurveysController } from '../../../../presentation/controllers/survey/ListAllSurveysController/ListAllSurveysController'
import { Controller } from '../../../../presentation/protocols/Controller'
import { makeLogControllerDecorator } from '../../decorators/makeLogControllerDecorator'

import { makeDbListAllSurveysUseCase } from '../../usecases/list-all-surveys/makeDbListAllSurveysUseCase'

export const makeListAllSurveysController = (): Controller => {
    const listAllSurveysController = new ListAllSurveysController(makeDbListAllSurveysUseCase())

    return makeLogControllerDecorator(listAllSurveysController)
}
