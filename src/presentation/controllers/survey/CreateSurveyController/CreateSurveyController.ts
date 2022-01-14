import { CreateSurvey } from "../../../../domain/usecases/CreateSurvey";
import { badRequest } from "../../../helpers/http/httpHelper";
import { Controller } from "../../../protocols/Controller";
import { HttpRequest } from "../../../protocols/HttpRequest";
import { HttpResponse } from "../../../protocols/HttpResponse";
import { Validation } from "../../../protocols/Validation";

export class CreateSurveyController implements Controller {

    private readonly validation: Validation
    private readonly createSurvey: CreateSurvey

    constructor(validation: Validation, createSurvey: CreateSurvey) {
        this.createSurvey = createSurvey
        this.validation = validation

    }

    async handle(request: HttpRequest): Promise<HttpResponse> {
        const error = this.validation.validate(request.body)

        if (error) {
            return badRequest(error)
        }
        const { question, answers } = request.body

        await this.createSurvey.create({
            question,
            answers
        })

        return Promise.resolve({ body: null, statusCode: 200 })

    }

}