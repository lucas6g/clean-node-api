import { AddAccount, AddAccountModel } from '../../../domain/usecases/AddAccount'
import { DbAddAccount } from './DbAddAccount'
import { Encrypter } from '../../protocols/Encrypter'
import { AddAccountRepository } from './AddAccountRepository'
import { Account } from '../../../domain/entities/Account'

const makeEncrypterStub = (): Encrypter => {
  // dependencia mockada
  class EncrypterStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return await new Promise(resolve => resolve('hashedPassword'))
    }
  }
  return new EncrypterStub()
}
const makeAddAccountRepositoryStub = (): AddAccountRepository => {
  // dependencia mockada
  class AddAccountRepositoryStub implements AddAccountRepository {
    async save (account: AddAccountModel): Promise<Account> {
      const fakeAccount = {
        id: 'anyId',
        name: 'anyName',
        email: 'anyEmail@mail.com',
        password: 'hashedPassword'

      }
      return await new Promise(resolve => resolve(fakeAccount))
    }
  }
  return new AddAccountRepositoryStub()
}

interface SutTypes {
  sut: AddAccount
  encrypterStub: Encrypter
  addAccountRepositoryStub: AddAccountRepository

}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypterStub()
  const addAccountRepositoryStub = makeAddAccountRepositoryStub()
  const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub)

  return {
    sut,
    encrypterStub,
    addAccountRepositoryStub

  }
}

const makeFakeAccountData = (): AddAccountModel => {
  return {
    name: 'anyName',
    email: 'anyEmail@mail.com',
    password: 'anyPassword'

  }
}
describe('DbAddAccount', () => {
  test('should call encrypter whit correct password', async () => {
    const { sut, encrypterStub } = makeSut()
    const accountData = makeFakeAccountData()

    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')

    await sut.add(accountData)

    expect(encryptSpy).toHaveBeenCalledWith('anyPassword')
  })

  test('should throws exeception  if encrypter throws exeception', async () => {
    const { sut, encrypterStub } = makeSut()

    const accountData = makeFakeAccountData()
    jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(new Promise((resolve, reject) => {
      return reject(new Error())
    }))

    await expect(
      sut.add(accountData)
    ).rejects.toBeInstanceOf(Error)
  })
  test('should call AddAccountRepository whith correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const accountData = makeFakeAccountData()

    const saveSpy = jest.spyOn(addAccountRepositoryStub, 'save')

    await sut.add(accountData)

    expect(saveSpy).toHaveBeenCalledWith({
      name: 'anyName',
      email: 'anyEmail@mail.com',
      password: 'hashedPassword'
    })
  })
  test('should throws exeception  if AddAccountRepository throws exeception', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()

    const accountData = makeFakeAccountData()
    jest.spyOn(addAccountRepositoryStub, 'save').mockReturnValueOnce(new Promise((resolve, reject) => {
      return reject(new Error())
    }))

    await expect(
      sut.add(accountData)
    ).rejects.toBeInstanceOf(Error)
  })

  test('should return an account  on success ', async () => {
    const { sut } = makeSut()
    const accountData = makeFakeAccountData()

    const account = await sut.add(accountData)

    expect(account).toEqual({
      id: 'anyId',
      name: 'anyName',
      email: 'anyEmail@mail.com',
      password: 'hashedPassword'

    })
  })
})
