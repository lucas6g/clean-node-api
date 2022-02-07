
import { ListAllSurveys } from '../../../../domain/usecases/ListAllSurveys'
import { Controller } from '../../../protocols/Controller'
import { HttpRequest } from '../../../protocols/HttpRequest'
import { HttpResponse } from '../../../protocols/HttpResponse'

export class ListAllSurveysController implements Controller {
    private readonly listAllSurvey: ListAllSurveys

    constructor(listAllSurvey: ListAllSurveys) {
        this.listAllSurvey = listAllSurvey
    }

    async handle(request: HttpRequest): Promise<HttpResponse> {
        await this.listAllSurvey.listAll()

        return await Promise.resolve({
            body: '',
            statusCode: 200
        })
    }
}
