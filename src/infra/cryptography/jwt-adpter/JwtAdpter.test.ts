import { JwtAdpter } from './JwtAdpter'
import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken', () => {
    return {
        sign(): string {
            return 'anyToken'
        }
    }
})

describe('JwtAdpter', () => {
    test('should call sign whit correct values', async () => {
        const sut = new JwtAdpter('secret')

        const signSpy = jest.spyOn(jwt, 'sign')
        await sut.generate('anyValue')

        expect(signSpy).toHaveBeenCalledWith({ id: 'anyValue' }, 'secret')
    })
    test('should return a token on sign success', async () => {
        const sut = new JwtAdpter('secret')

        const token = await sut.generate('anyValue')

        expect(token).toBe('anyToken')
    })
})
