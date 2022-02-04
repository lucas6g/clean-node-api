import { AccessDaniedError } from "../errors/AccessDaniedError"

import { PermitionsMiddleware } from './PermitionsMiddleware'



describe('PermitionsMiddleware', () => {


    test('should return  403 if no accountId is provided', async () => {

        const sut = new PermitionsMiddleware()

        const httpResponse = await sut.handle({})

        expect(httpResponse.statusCode).toBe(403)
        expect(httpResponse.body).toEqual(new AccessDaniedError())




    })



})