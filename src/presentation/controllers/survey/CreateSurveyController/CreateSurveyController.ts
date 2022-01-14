import { Controller } from "../../../protocols/Controller";
import { HttpRequest } from "../../../protocols/HttpRequest";
import { HttpResponse } from "../../../protocols/HttpResponse";
import { Validation } from "../../../protocols/Validation";

export class CreateSurveyController implements Controller {

    private readonly validation: Validation
    constructor(validation: Validation) {

        this.validation = validation

    }

    async handle(request: HttpRequest): Promise<HttpResponse> {
        this.validation.validate(request.body)

        return Promise.resolve({ body: null, statusCode: 200 })

    }

}