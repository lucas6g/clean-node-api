
import { ListAllSurveys } from '../../../../domain/usecases/ListAllSurveys'
import { ok, serverError } from '../../../helpers/http/httpHelper'
import { Controller } from '../../../protocols/Controller'
import { HttpRequest } from '../../../protocols/HttpRequest'
import { HttpResponse } from '../../../protocols/HttpResponse'

export class ListAllSurveysController implements Controller {
    private readonly listAllSurvey: ListAllSurveys

    constructor(listAllSurvey: ListAllSurveys) {
        this.listAllSurvey = listAllSurvey
    }

    async handle(request: HttpRequest): Promise<HttpResponse> {
        try {
            const surveys = await this.listAllSurvey.listAll()
            return ok(surveys)
        } catch (error) {
            return serverError(error)
        }
    }
}
