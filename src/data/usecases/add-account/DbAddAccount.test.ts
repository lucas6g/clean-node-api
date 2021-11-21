import { AddAccount } from '../../../domain/usecases/AddAccount'
import { DbAddAccount } from './DbAddAccount'
import { Encrypter } from '../../protocols/Encrypter'

const makeEncrypterStub = (): Encrypter => {
  // dependencia mockada
  class EncrypterStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return await new Promise(resolve => resolve('hashedPassword'))
    }
  }
  return new EncrypterStub()
}

interface SutTypes {
  sut: AddAccount
  encrypterStub: Encrypter

}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypterStub()
  const sut = new DbAddAccount(encrypterStub)

  return {
    sut,
    encrypterStub

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
})
