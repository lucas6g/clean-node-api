import { JwtAdpter } from './JwtAdpter'
import jwt from 'jsonwebtoken'
import { TokenGenerator } from '../../../data/protocols/cryptography/TokenGenerator'

jest.mock('jsonwebtoken', () => {
    return {
        sign(): string {
            return 'anyToken'
        }
    }
})

const makeSut = (): TokenGenerator => {
    const secret = 'secret'
    return new JwtAdpter(secret)
}

describe('JwtAdpter', () => {
    test('should call sign whit correct values', async () => {
        const sut = makeSut()

        const signSpy = jest.spyOn(jwt, 'sign')
        await sut.generate('anyValue')

        expect(signSpy).toHaveBeenCalledWith({ id: 'anyValue' }, 'secret')
    })
    test('should return a token on sign success', async () => {
        const sut = makeSut()

        const token = await sut.generate('anyValue')

        expect(token).toBe('anyToken')
    })
    test('should trows an error when sign trows an error', async () => {
        const sut = makeSut()

        jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
            throw new Error()
        })

        await expect(sut.generate('anyValue')).rejects.toBeInstanceOf(Error)
    })
})
