import { LoadAccountByTokenRepository } from "../../data/protocols/db/account/LoadAccountByTokenRepository";
import { AccessDaniedError } from "../errors/AccessDaniedError";
import { forbidden } from "../helpers/http/httpHelper";
import { HttpRequest } from "../protocols/HttpRequest";
import { HttpResponse } from "../protocols/HttpResponse";
import { Middleware } from "../protocols/Middleware";

export class AuthMiddleware implements Middleware {

    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository

    constructor(loadAccountByTokenRepository: LoadAccountByTokenRepository) {
        this.loadAccountByTokenRepository = loadAccountByTokenRepository
    }

    async handle(request: HttpRequest): Promise<HttpResponse> {

        const token = request.headers?.['x-access-token']
        if (token) {

            await this.loadAccountByTokenRepository.getByToken(token)
        }


        return await Promise.resolve(forbidden(new AccessDaniedError()))
    }
}
