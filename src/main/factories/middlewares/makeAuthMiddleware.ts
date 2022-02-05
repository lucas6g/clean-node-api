
import { AuthMiddleware } from "../../../presentation/middlewares/AuthMiddleware"
import { Middleware } from "../../../presentation/protocols/Middleware"
import { makeDbLoadAccountByToken } from "../usecases/load-account-by-token/makeDbLoadAccountByToken"

export const makeAuthMiddleware = (): Middleware => {
    return new AuthMiddleware(makeDbLoadAccountByToken())

}

