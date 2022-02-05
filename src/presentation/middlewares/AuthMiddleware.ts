
import { LoadAccountByToken } from "../../domain/usecases/LoadAccountByToken";
import { AccessDaniedError } from "../errors/AccessDaniedError";
import { forbidden, ok, serverError } from "../helpers/http/httpHelper";
import { HttpRequest } from "../protocols/HttpRequest";
import { HttpResponse } from "../protocols/HttpResponse";
import { Middleware } from "../protocols/Middleware";

export class AuthMiddleware implements Middleware {

    private readonly loadAccountByToken: LoadAccountByToken
    private readonly role?: string

    constructor(loadAccountByToken: LoadAccountByToken, role?: string) {
        this.loadAccountByToken = loadAccountByToken
        this.role = role
    }

    async handle(request: HttpRequest): Promise<HttpResponse> {


        try {

            const token = request.headers?.['x-access-token']

            if (token) {

                const account = await this.loadAccountByToken.getByToken(token, this.role)


                if (account) {
                    return ok({ accountId: account.id })
                }
            }
            return await Promise.resolve(forbidden(new AccessDaniedError()))
        } catch (error) {
            return serverError(error)
        }


    }
}
