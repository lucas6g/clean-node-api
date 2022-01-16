import { HttpRequest } from "../protocols/HttpRequest"
import { AuthMiddleware } from './AuthMiddleware'
import { AccessDaniedError } from '../errors/AccessDaniedError'
import { LoadAccountByToken } from '../../domain/usecases/LoadAccountByToken'
import { Account } from "../../domain/entities/Account"
const httpRequest: HttpRequest = {
    headers: {
        'x-access-token': 'anyToken'
    }
}


const makeAccountByTokenRepositoryStub = (): LoadAccountByToken => {

    class LoadAccountByTokenStub implements LoadAccountByToken {
        async getByToken(token: string, role?: string): Promise<Account> {
            return await Promise.resolve({
                id: 'anyId',
                name: 'anyName',
                email: 'anyEmail@mail.com',
                password: 'hashedPassword'
            })
        }
    }
    return new LoadAccountByTokenStub()
}


interface SutTypes {
    sut: AuthMiddleware
    loadAccountByTokenStub: LoadAccountByToken

}
const makeSut = (): SutTypes => {


    const loadAccountByTokenStub = makeAccountByTokenRepositoryStub()
    const sut = new AuthMiddleware(loadAccountByTokenStub)

    return {
        sut,
        loadAccountByTokenStub

    }
}




describe('Auth Midleware', () => {


    test('should 403 if no auth token exists in headers', async () => {
        const { sut } = makeSut()

        const httpResponse = await sut.handle({})

        expect(httpResponse.statusCode).toBe(403)
        expect(httpResponse.body).toEqual(new AccessDaniedError())

    })

    test('should return LoadAccountByToken whit correct access token', async () => {

        const { loadAccountByTokenStub, sut } = makeSut()


        const getByTokenSpy = jest.spyOn(loadAccountByTokenStub, 'getByToken')


        await sut.handle(httpRequest)

        expect(getByTokenSpy).toHaveBeenCalledWith('anyToken')

    })
    test('should 403 if LoadAccountByToken returns null', async () => {

        const { loadAccountByTokenStub, sut } = makeSut()


        jest.spyOn(loadAccountByTokenStub, 'getByToken').mockReturnValueOnce(Promise.resolve(null))


        const httpResponse = await sut.handle(httpRequest)

        expect(httpResponse.statusCode).toBe(403)
        expect(httpResponse.body).toEqual(new AccessDaniedError())

    })
    test('should returns 200 if LoadAccountByToken returns an account', async () => {

        const { sut } = makeSut()

        const httpResponse = await sut.handle(httpRequest)

        expect(httpResponse.statusCode).toBe(200)
        expect(httpResponse.body).toEqual({
            accountId: 'anyId'
        })


    })
})