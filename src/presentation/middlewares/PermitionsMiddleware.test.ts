
import { VerifyPermition } from "../../domain/usecases/VerifyPermition"
import { AccessDaniedError } from "../errors/AccessDaniedError"
import { ServerError } from "../errors/ServerError"
import { Middleware } from "../protocols/Middleware"

import { PermitionsMiddleware } from './PermitionsMiddleware'

const makeVerifyPermitionStub = (): VerifyPermition => {

    class VerifyPermitionStub implements VerifyPermition {
        async verify(accountId: string, role: string): Promise<boolean> {
            return await Promise.resolve(true)
        }
    }
    return new VerifyPermitionStub()
}


interface SutTypes {
    sut: Middleware
    verifyPermitionStub: VerifyPermition

}

const makeSut = (role: string): SutTypes => {


    const verifyPermitionStub = makeVerifyPermitionStub()
    const sut = new PermitionsMiddleware(verifyPermitionStub, role)

    return {
        sut,
        verifyPermitionStub

    }
}


describe('PermitionsMiddleware', () => {


    test('should return  403 if no accountId is provided', async () => {

        const { sut } = makeSut('anyRole')

        const httpResponse = await sut.handle({})

        expect(httpResponse.statusCode).toBe(403)
        expect(httpResponse.body).toEqual(new AccessDaniedError())

    })
    test('should  call VerifyPermition whit correct values', async () => {

        const { sut, verifyPermitionStub } = makeSut('anyRole')


        const verifySpy = jest.spyOn(verifyPermitionStub, 'verify')


        await sut.handle({
            body: {
                accountId: 'anyAccountId'
            }
        })

        expect(verifySpy).toHaveBeenCalledWith('anyAccountId', 'anyRole')


    })
    test('should returns 403 if VerifyPemition  returns false', async () => {

        const { verifyPermitionStub, sut } = makeSut('anyRole')


        jest.spyOn(verifyPermitionStub, 'verify').mockReturnValueOnce(Promise.resolve(false))


        const httpResponse = await sut.handle({
            body: {
                accountId: 'anyAccountId'
            }
        })

        expect(httpResponse.statusCode).toBe(403)
        expect(httpResponse.body).toEqual(new AccessDaniedError())

    })

    test('should returns 200 if VerifyPemition retuns true', async () => {

        const { sut } = makeSut('anyRole')

        const httpResponse = await sut.handle({
            body: {
                accountId: 'anyAccountId'
            }
        })

        expect(httpResponse.statusCode).toBe(200)
        expect(httpResponse.body).toEqual({
            accountId: 'anyAccountId'
        })


    })

    test('should returns 500 if LoadAccountByToken trows error', async () => {

        const { sut, verifyPermitionStub } = makeSut('anyRole')


        jest.spyOn(verifyPermitionStub, 'verify').mockImplementationOnce(() => {
            throw new Error()
        })

        const httpResponse = await sut.handle({
            body: {
                accountId: 'anyAccountId'
            }
        })

        expect(httpResponse.statusCode).toBe(500)
        expect(httpResponse.body).toEqual(new ServerError(httpResponse.body.stack))


    })





})