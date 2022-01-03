import { Account } from '../../../domain/entities/Account'
import { DbAuthentication } from './DbAuthentication'
import { LoadAccountByEmailRepository } from './LoadAccountByEmailRepository'

const makeFakeAccount = (): Account => {
    return {
        id: 'anyId',
        name: 'anyName',
        email: 'anyEmail@mail.com',
        password: 'anyPassword'
    }
}

const makeLoadAccoutRepositoryStub = (): LoadAccountByEmailRepository => {
    // dependencia mockada
    class LoadAccoutRepositoryStub implements LoadAccountByEmailRepository {
        async getByEmail(email: string): Promise<Account | null> {
            const fakeAccount = makeFakeAccount()
            return await Promise.resolve(fakeAccount)
        }
    }
    return new LoadAccoutRepositoryStub()
}

interface SutTypes {

    sut: DbAuthentication
    loadAccountRepositoryStub: LoadAccountByEmailRepository

}

const makeSut = (): SutTypes => {
    const loadAccountRepositoryStub = makeLoadAccoutRepositoryStub()
    const sut = new DbAuthentication(loadAccountRepositoryStub)

    return {
        loadAccountRepositoryStub,
        sut
    }
}

describe('Db Authentication', () => {
    test('should call LoadAccountByEmailRepository whit correct email', async () => {
        const { sut, loadAccountRepositoryStub } = makeSut()

        const getByEmailSpy = jest.spyOn(loadAccountRepositoryStub, 'getByEmail')

        await sut.auth('anyEmail@mail.com', 'anyPassword')

        expect(getByEmailSpy).toHaveBeenCalledWith('anyEmail@mail.com')
    })
    test('should trows an error if LoadAccountByEmailRepository trows an error', async () => {
        const { sut, loadAccountRepositoryStub } = makeSut()

        jest.spyOn(loadAccountRepositoryStub, 'getByEmail').mockImplementationOnce(async () => {
            throw Error()
        })

        await expect(
            sut.auth('anyEmail@mail.com', 'anyPassword')
        ).rejects.toBeInstanceOf(Error)
    })
    test('should return null if LoadAccountByEmailRepository returs null ', async () => {
        const { sut, loadAccountRepositoryStub } = makeSut()

        jest.spyOn(loadAccountRepositoryStub, 'getByEmail').mockReturnValueOnce(Promise.resolve(null))

        const token = await sut.auth('anyEmail@mail.com', 'anyPassword')

        expect(token).toBeNull()
    })
})
