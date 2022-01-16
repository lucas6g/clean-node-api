import { LoadAccountByToken } from "../../domain/usecases/LoadAccountByToken";
import { AccessDaniedError } from "../errors/AccessDaniedError";
import { forbidden } from "../helpers/http/httpHelper";
import { HttpRequest } from "../protocols/HttpRequest";
import { HttpResponse } from "../protocols/HttpResponse";
import { Middleware } from "../protocols/Middleware";

export class AuthMiddleware implements Middleware {

    private readonly loadAccountByToken: LoadAccountByToken

    constructor(loadAccountByToken: LoadAccountByToken) {
        this.loadAccountByToken = loadAccountByToken
    }

    async handle(request: HttpRequest): Promise<HttpResponse> {

        const token = request.headers?.['x-access-token']
        if (token) {

            await this.loadAccountByToken.getByToken(token)
        }


        return await Promise.resolve(forbidden(new AccessDaniedError()))
    }
}
