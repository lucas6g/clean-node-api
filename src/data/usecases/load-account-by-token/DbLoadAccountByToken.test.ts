
import { LoadAccountByToken } from '../../../domain/usecases/LoadAccountByToken'
import { TokenVerifier } from '../../protocols/cryptography/TokenVerifier'
import { DbLoadAccountByToken } from './DbLoadAccountByToken'

import { LoadAccountByTokenRepository } from '../../protocols/db/account/LoadAccountByTokenRepository'
import { Account } from '../../../domain/entities/Account'

const makeLoadAccountByTokenRepositoryStub = (): LoadAccountByTokenRepository => {
    class LoadAccountByTokenRepositoryStub implements LoadAccountByTokenRepository {
        async loadByToken(token: string): Promise<Account | null> {
            return await Promise.resolve({
                id: 'anyId',
                name: 'anyName',
                email: 'anyEmail@mail.com',
                password: 'hashedPassword'

            })
        }
    }
    return new LoadAccountByTokenRepositoryStub()
}

const makeTokenVerifierStub = (): TokenVerifier => {
    class TokenVerifierStub implements TokenVerifier {
        async verify(token: string): Promise<string> {
            return await Promise.resolve('anyValue')
        }
    }
    return new TokenVerifierStub()
}
type SutTypes = {
    sut: LoadAccountByToken
    tokenVerifierStub: TokenVerifier
    loadAccountByTokenRepositoryStub: LoadAccountByTokenRepository

}
const makeSut = (): SutTypes => {
    const tokenVerifierStub = makeTokenVerifierStub()
    const loadAccountByTokenRepositoryStub = makeLoadAccountByTokenRepositoryStub()

    const sut = new DbLoadAccountByToken(tokenVerifierStub, loadAccountByTokenRepositoryStub)

    return {
        sut,
        tokenVerifierStub,
        loadAccountByTokenRepositoryStub

    }
}

describe('DbLoadAccountByToken', () => {
    test('should call TokenVerifier whit correct value', async () => {
        const { tokenVerifierStub, sut } = makeSut()

        const verifySpy = jest.spyOn(tokenVerifierStub, 'verify')

        await sut.getByToken('anyToken')

        expect(verifySpy).toHaveBeenCalledWith('anyToken')
    })
    test('should returns null if TokenVerifier returns null', async () => {
        const { sut, tokenVerifierStub } = makeSut()

        jest.spyOn(tokenVerifierStub, 'verify').mockReturnValue(Promise.resolve(null))

        const account = await sut.getByToken('anyToken')

        expect(account).toBeNull()
    })

    test('should call LoadAccountByTokenRepository whit correct value', async () => {
        const { sut, loadAccountByTokenRepositoryStub } = makeSut()

        const loadByTokenSpy = jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken')

        await sut.getByToken('anyToken')

        expect(loadByTokenSpy).toHaveBeenCalledWith('anyToken')
    })
    test('should returns null if LoadAccountByTokenRepository returns null', async () => {
        const { sut, loadAccountByTokenRepositoryStub } = makeSut()

        jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken').mockReturnValue(Promise.resolve(null))

        const account = await sut.getByToken('anyToken')

        expect(account).toBeNull()
    })
    test('should returns account on success', async () => {
        const { sut } = makeSut()

        const account = await sut.getByToken('anyToken')

        expect(account).toEqual({
            id: 'anyId',
            name: 'anyName',
            email: 'anyEmail@mail.com',
            password: 'hashedPassword'

        })
    })
    test('should trows exepteion if LoadAccountByTokenRepository trows exeption ', async () => {
        const { sut, loadAccountByTokenRepositoryStub } = makeSut()

        jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken').mockReturnValueOnce(Promise.reject(new Error()))

        await expect(
            sut.getByToken('anyToken')
        ).rejects.toBeInstanceOf(Error)
    })
    test('should trows exeption if TokenVerifier trows exeption', async () => {
        const { sut, tokenVerifierStub } = makeSut()

        jest.spyOn(tokenVerifierStub, 'verify').mockReturnValueOnce(Promise.reject(new Error()))

        await expect(
            sut.getByToken('anyToken')
        ).rejects.toBeInstanceOf(Error)
    })
})
