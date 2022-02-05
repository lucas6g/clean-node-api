
import { PermitionsMiddleware } from '../../../presentation/middlewares/PermitionsMiddleware'
import { Middleware } from '../../../presentation/protocols/Middleware'
import { makeDbVerifyPermitionUseCase } from '../usecases/verify-permition/makeDbVerifyPermitionUseCase'

export const makePermitionsMiddleware = (role: string): Middleware => {
    return new PermitionsMiddleware(makeDbVerifyPermitionUseCase(), role)
}
