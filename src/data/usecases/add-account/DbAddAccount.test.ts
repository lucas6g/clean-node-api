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
        id: 'validId',
        name: 'validName',
        email: 'validEmail@mail.com',
        password: 'validPassword'

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

describe('DbAddAccount', () => {
  test('should call encrypter whit correct password', async () => {
    const { sut, encrypterStub } = makeSut()
    const accountData = {
      name: 'anyName',
      email: 'anyEmail@gmail.com',
      password: 'anyPassword'
    }

    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')

    await sut.add(accountData)

    expect(encryptSpy).toHaveBeenCalledWith('anyPassword')
  })

  test('should throws exeception  if encrypter throws exeception', async () => {
    const { sut, encrypterStub } = makeSut()

    jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(new Promise((resolve, reject) => {
      return reject(new Error())
    }))

    const accountData = {
      name: 'anyName',
      email: 'anyEmail@gmail.com',
      password: 'anyPassword'
    }

    await expect(
      sut.add(accountData)
    ).rejects.toBeInstanceOf(Error)
  })
  test('should call AddAccountRepository whith correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()

    const saveSpy = jest.spyOn(addAccountRepositoryStub, 'save')

    const accountData = {
      name: 'anyName',
      email: 'anyEmail@mail.com',
      password: 'anyPassword'
    }
    await sut.add(accountData)

    expect(saveSpy).toHaveBeenCalledWith({
      name: 'anyName',
      email: 'anyEmail@mail.com',
      password: 'hashedPassword'
    })
  })
})
