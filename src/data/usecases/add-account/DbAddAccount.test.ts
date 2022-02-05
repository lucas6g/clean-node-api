import { AddAccount, AddAccountModel } from '../../../domain/usecases/AddAccount'
import { DbAddAccount } from './DbAddAccount'
import { Hasher } from '../../protocols/cryptography/Hasher'
import { AddAccountRepository } from './AddAccountRepository'
import { Account } from '../../../domain/entities/Account'
import { LoadAccountByEmailRepository } from '../authentication/LoadAccountByEmailRepository'

const makeHasherStub = (): Hasher => {
  // dependencia mockada
  class HasherStub implements Hasher {
    async hash(value: string): Promise<string> {
      return await new Promise(resolve => resolve('hashedPassword'))
    }
  }
  return new HasherStub()
}

const makeFakeAccount = (): Account => {
  return {
    id: 'anyId',
    name: 'anyName',
    email: 'anyEmail@mail.com',
    password: 'hashedPassword'
  }
}

const makeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  // dependencia mockada
  class LoadAccoutRepositoryStub implements LoadAccountByEmailRepository {
    async getByEmail(email: string): Promise<Account | null> {
      return await Promise.resolve(null)
    }
  }
  return new LoadAccoutRepositoryStub()
}
const makeAddAccountRepositoryStub = (): AddAccountRepository => {
  // dependencia mockada
  class AddAccountRepositoryStub implements AddAccountRepository {
    async save(account: AddAccountModel): Promise<Account> {
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
  hasherStub: Hasher
  loadAccountRepositoryStub: LoadAccountByEmailRepository
  addAccountRepositoryStub: AddAccountRepository

}

const makeSut = (): SutTypes => {
  const hasherStub = makeHasherStub()
  const addAccountRepositoryStub = makeAddAccountRepositoryStub()
  const loadAccountRepositoryStub = makeLoadAccountByEmailRepository()
  const sut = new DbAddAccount(hasherStub, addAccountRepositoryStub, loadAccountRepositoryStub)

  return {
    sut,
    hasherStub,
    addAccountRepositoryStub,
    loadAccountRepositoryStub

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
  test('should call hasher whit correct password', async () => {
    const { sut, hasherStub } = makeSut()
    const accountData = makeFakeAccountData()

    const hashSpy = jest.spyOn(hasherStub, 'hash')

    await sut.add(accountData)

    expect(hashSpy).toHaveBeenCalledWith('anyPassword')
  })

  test('should throws exeception  if Hasher throws exeception', async () => {
    const { sut, hasherStub } = makeSut()

    const accountData = makeFakeAccountData()
    jest.spyOn(hasherStub, 'hash').mockReturnValueOnce(new Promise((resolve, reject) => {
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
  test('should call LoadAccountByEmailRepository whit correct email', async () => {
    const { sut, loadAccountRepositoryStub } = makeSut()

    const getByEmailSpy = jest.spyOn(loadAccountRepositoryStub, 'getByEmail')

    const accountData = makeFakeAccountData()
    await sut.add(accountData)

    expect(getByEmailSpy).toHaveBeenCalledWith('anyEmail@mail.com')
  })
  test('should returns null if LoadAccountByEmailRepository returns account', async () => {
    const { sut, loadAccountRepositoryStub } = makeSut()

    jest.spyOn(loadAccountRepositoryStub, 'getByEmail').mockReturnValueOnce(Promise.resolve(makeFakeAccount()))

    const account = await sut.add(makeFakeAccount())

    expect(account).toBeNull()
  })
  test('should trows error if LoadAccountByEmailRepository trows error', async () => {
    const { sut, loadAccountRepositoryStub } = makeSut()

    jest.spyOn(loadAccountRepositoryStub, 'getByEmail').mockImplementationOnce(() => {
      throw new Error()
    })

    const accountData = makeFakeAccountData()

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
