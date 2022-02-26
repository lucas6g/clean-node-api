import { badRequest } from '../../../helpers/http/httpHelper'
import { Controller } from '../../../protocols/Controller'
import { HttpRequest } from '../../../protocols/HttpRequest'
import { HttpResponse } from '../../../protocols/HttpResponse'
import { Validation } from '../../../protocols/Validation'

export class AnswerSurveyController implements Controller {
    private readonly validation: Validation

    constructor(validation: Validation) {
        this.validation = validation
    }

    async handle(request: HttpRequest): Promise<HttpResponse> {
        let error: Error | null

        error = this.validation.validate(request.params)

        if (error) {
            return badRequest(error)
        }

        error = this.validation.validate(request.body)

        if (error) {
            return badRequest(error)
        }

        return await Promise.resolve({
            body: null,
            statusCode: 800
        })
    }
}
