
import { DbVerifyPermition } from './DbVerifyPermition'
import { LoadAccountByIdRepository } from '../../../data/protocols/db/account/LoadAccountByIdRepository'
import { Account } from '../../../domain/entities/Account'

describe('DbVerifyPermition', () => {
    test('should call LoadAccountByIdRepository whit correct value', async () => {

        class LoadAccountByIdStub implements LoadAccountByIdRepository {
            async loadById(accountId: string): Promise<Account | null> {
                return await Promise.resolve({
                    id: 'anyId',
                    name: 'anyName',
                    email: 'anyEmail@mail.com',
                    password: 'hashedPassword'
                })
            }
        }


        const loadAccountByIdStub = new LoadAccountByIdStub()
        const sut = new DbVerifyPermition(loadAccountByIdStub)

        const loadByIdSpy = jest.spyOn(loadAccountByIdStub, 'loadById')


        await sut.verify('anyAccountId', 'anyRole')


        expect(loadByIdSpy).toHaveBeenCalledWith('anyAccountId')

    })


})