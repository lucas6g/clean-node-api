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
    test('should call LoadAccountByEmail repository whit correct email', async () => {
        const { sut, loadAccountRepositoryStub } = makeSut()

        const getByEmailSpy = jest.spyOn(loadAccountRepositoryStub, 'getByEmail')

        await sut.auth('anyEmail@mail.com', 'anyPassword')

        expect(getByEmailSpy).toHaveBeenCalledWith('anyEmail@mail.com')
    })
})
