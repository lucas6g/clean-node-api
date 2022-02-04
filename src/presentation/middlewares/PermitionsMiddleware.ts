import { AccessDaniedError } from "../errors/AccessDaniedError";
import { forbidden } from "../helpers/http/httpHelper";
import { HttpRequest } from "../protocols/HttpRequest";
import { HttpResponse } from "../protocols/HttpResponse";
import { Middleware } from "../protocols/Middleware";

export class PermitionsMiddleware implements Middleware {

    async handle(request: HttpRequest): Promise<HttpResponse> {


        return Promise.resolve(forbidden(new AccessDaniedError()))


    }

}