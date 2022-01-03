import { Account } from '../../../domain/entities/Account'
import { DbAuthentication } from './DbAuthentication'
import { LoadAccountByEmailRepository } from './LoadAccountByEmailRepository'

class LoadAccoutRepositoryStub implements LoadAccountByEmailRepository {
    async getByEmail(email: string): Promise<Account | null> {
        const account = {
            id: 'anyId',
            name: 'anyName',
            email: 'anyEmail@mail.com',
            password: 'anyPassword'
        }
        return await Promise.resolve(account)
    }
}

describe('Db Authentication', () => {
    test('should call LoadAccountByEmail repository whit correct email', async () => {
        const loadAccountRepositoryStub = new LoadAccoutRepositoryStub()
        const sut = new DbAuthentication(loadAccountRepositoryStub)

        const getByEmailSpy = jest.spyOn(loadAccountRepositoryStub, 'getByEmail')

        await sut.auth('anyEmail@mail.com', 'anyPassword')

        expect(getByEmailSpy).toHaveBeenCalledWith('anyEmail@mail.com')
    })
})
