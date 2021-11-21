import { Encrypter } from '../../data/protocols/Encrypter'
import { BcryptAdpter } from './BcryptAdpter'
import bcrypt from 'bcrypt'

jest.mock('bcrypt', () => {
  return {
    async hash (): Promise<string> {
      return await new Promise(resolve => resolve('hashedValue'))
    }
  }
})

const makeSut = (salt: number): Encrypter => {
  return new BcryptAdpter(salt)
}
describe('BcryptAdpter', () => {
  test('should call bcrypt with correct values', async () => {
    const salt = 12
    const sut = makeSut(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')

    await sut.encrypt('anyValue')

    expect(hashSpy).toHaveBeenCalledWith('anyValue', salt)
  })
  test('should return a hash on success', async () => {
    const salt = 12
    const sut = makeSut(salt)

    const hashValue = await sut.encrypt('anyValue')

    expect(hashValue).toBe('hashedValue')
  })
})
