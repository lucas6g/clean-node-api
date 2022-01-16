import { HttpRequest } from "../protocols/HttpRequest"
import { AuthMiddleware } from './AuthMiddleware'
import { AccessDaniedError } from '../errors/AccessDaniedError'
const httpRequest: HttpRequest = {
    headers: {

    }
}
describe('Auth Midleware', () => {
    test('should 403 if no auth token exists in headers', async () => {
        const sut = new AuthMiddleware()
        const httpResponse = await sut.handle({})


        expect(httpResponse.statusCode).toBe(403)
        expect(httpResponse.body).toEqual(new AccessDaniedError())



    })
})