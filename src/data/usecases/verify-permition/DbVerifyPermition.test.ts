
import { DbVerifyPermition } from './DbVerifyPermition'
import { LoadAccountByIdRepository } from '../../../data/protocols/db/account/LoadAccountByIdRepository'
import { Account } from '../../../domain/entities/Account'
import { VerifyPermition } from '../../../domain/usecases/VerifyPermition'


const makeLoadAccountByIdRepositoryStub = (): LoadAccountByIdRepository => {
    class LoadAccountByIdRepositoryStub implements LoadAccountByIdRepository {

        async loadById(accountId: string): Promise<Account> {

            return Promise.resolve({
                id: 'anyId',
                name: 'anyName',
                email: 'anyEmail@mail.com',
                password: 'hashedPassword',
                role: 'anyRole'

            })
        }

    }
    return new LoadAccountByIdRepositoryStub()
}
interface SutTypes {
    sut: VerifyPermition
    loadAccountByIdRepositoryStub: LoadAccountByIdRepository



}
const makeSut = (): SutTypes => {

    const loadAccountByIdRepositoryStub = makeLoadAccountByIdRepositoryStub()

    const sut = new DbVerifyPermition(loadAccountByIdRepositoryStub)

    return {
        sut,
        loadAccountByIdRepositoryStub,


    }
}


describe('DbVerifyPermition', () => {
    test('should call LoadAccountByIdRepository whit correct value', async () => {


        const { loadAccountByIdRepositoryStub, sut } = makeSut()

        const loadByIdSpy = jest.spyOn(loadAccountByIdRepositoryStub, 'loadById')


        await sut.verify('anyAccountId', 'anyRole')


        expect(loadByIdSpy).toHaveBeenCalledWith('anyAccountId')

    })
    test('should returns false if LoadAccountByIdRepository returns null', async () => {


        const { loadAccountByIdRepositoryStub, sut } = makeSut()


        jest.spyOn(loadAccountByIdRepositoryStub, 'loadById').mockReturnValueOnce(Promise.resolve(null))



        const hasPermition = await sut.verify('anyAccountId', 'anyRole')


        expect(hasPermition).toBe(false)

    })
    test('should trows exeption if LoadAccountByIdRepository trows exeption ', async () => {

        const { sut, loadAccountByIdRepositoryStub } = makeSut()


        jest.spyOn(loadAccountByIdRepositoryStub, 'loadById').mockReturnValueOnce(Promise.reject(new Error()))

        await expect(
            sut.verify('anyAccountId', 'anyRole')
        ).rejects.toBeInstanceOf(Error)


    })
    test('should returns false if account role do not match', async () => {

        const { sut, loadAccountByIdRepositoryStub } = makeSut()

        jest.spyOn(loadAccountByIdRepositoryStub, 'loadById').mockReturnValueOnce(Promise.resolve({
            id: 'anyId',
            name: 'anyName',
            email: 'anyEmail@mail.com',
            password: 'hashedPassword',
            role: 'differentRole'

        })
        )
        const hasPermition = await sut.verify('anyAccountId', 'anyRole')

        expect(hasPermition).toBe(false)

    })





})