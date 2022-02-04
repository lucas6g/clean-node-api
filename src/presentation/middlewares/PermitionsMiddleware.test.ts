
import { VerifyPermition } from "../../domain/usecases/VerifyPermition"
import { AccessDaniedError } from "../errors/AccessDaniedError"
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





})