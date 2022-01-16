import { HttpRequest } from "../protocols/HttpRequest"
import { AuthMiddleware } from './AuthMiddleware'
import { AccessDaniedError } from '../errors/AccessDaniedError'
import { LoadAccountByTokenRepository } from '../../data/protocols/db/account/LoadAccountByTokenRepository'
import { Account } from "../../domain/entities/Account"
const httpRequest: HttpRequest = {
    headers: {
        'x-access-token': 'anyToken'
    }
}


class LoadAccountByRepositoryStub implements LoadAccountByTokenRepository {
    async getByToken(token: string, role?: string): Promise<Account> {
        return await Promise.resolve({
            id: 'anyId',
            name: 'anyName',
            email: 'anyEmail@mail.com',
            password: 'hashedPassword'
        })
    }
}


describe('Auth Midleware', () => {


    test('should 403 if no auth token exists in headers', async () => {
        const loadAccountByTokenRepositoryStub = new LoadAccountByRepositoryStub()
        const sut = new AuthMiddleware(loadAccountByTokenRepositoryStub)
        const httpResponse = await sut.handle({})

        expect(httpResponse.statusCode).toBe(403)
        expect(httpResponse.body).toEqual(new AccessDaniedError())

    })
    test('should call LoadAccountByToken whit correct access token', async () => {

        const loadAccountByTokenRepositoryStub = new LoadAccountByRepositoryStub()
        const sut = new AuthMiddleware(loadAccountByTokenRepositoryStub)


        const getByTokenSpy = jest.spyOn(loadAccountByTokenRepositoryStub, 'getByToken')


        await sut.handle(httpRequest)

        expect(getByTokenSpy).toHaveBeenCalledWith('anyToken')

    })
})