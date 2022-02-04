
import { VerifyPermition } from "../../domain/usecases/VerifyPermition";
import { AccessDaniedError } from "../errors/AccessDaniedError";
import { forbidden, ok } from "../helpers/http/httpHelper";
import { HttpRequest } from "../protocols/HttpRequest";
import { HttpResponse } from "../protocols/HttpResponse";
import { Middleware } from "../protocols/Middleware";

export class PermitionsMiddleware implements Middleware {

    private readonly verifyPermition: VerifyPermition
    private readonly role: string

    constructor(verifyPermition: VerifyPermition, role: string) {
        this.verifyPermition = verifyPermition
        this.role = role
    }

    async handle(request: HttpRequest): Promise<HttpResponse> {

        const accountId = request.body?.['accountId']

        if (accountId) {

            const hasPermition = await this.verifyPermition.verify(accountId, this.role)

            if (hasPermition) {
                return ok({ accountId })
            }


        }

        return Promise.resolve(forbidden(new AccessDaniedError()))


    }

}