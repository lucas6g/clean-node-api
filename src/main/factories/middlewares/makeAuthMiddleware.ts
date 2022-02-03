
import { AuthMiddleware } from "../../../presentation/middlewares/AuthMiddleware"
import { Middleware } from "../../../presentation/protocols/Middleware"
import { makeDbLoadAccountByToken } from "../usecases/load-account-by-token/makeDbLoadAccountByToken"

export const makeAuthMiddleware = (role?: string): Middleware => {
    return new AuthMiddleware(makeDbLoadAccountByToken(), role)

}

