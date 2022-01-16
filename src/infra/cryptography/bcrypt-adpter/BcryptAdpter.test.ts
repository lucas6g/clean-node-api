import { Hasher } from '../../../data/protocols/cryptography/Hasher'
import { BcryptAdpter } from './BcryptAdpter'
import bcrypt from 'bcrypt'
import { HashComparer } from '../../../data/protocols/cryptography/HashComparer'

jest.mock('bcrypt', () => {
  return {
    async hash(): Promise<string> {
      return await new Promise(resolve => resolve('hashedValue'))
    },
    async compare(): Promise<boolean> {
      return await Promise.resolve(true)
    }

  }
})

const makeSut = (salt: number): Hasher & HashComparer => {
  return new BcryptAdpter(salt)
}
describe('BcryptAdpter', () => {
  test('should call hash with correct values', async () => {
    const salt = 12
    const sut = makeSut(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')

    await sut.hash('anyValue')

    expect(hashSpy).toHaveBeenCalledWith('anyValue', salt)
  })
  test('should return a hash on success', async () => {
    const salt = 12
    const sut = makeSut(salt)

    const hashValue = await sut.hash('anyValue')

    expect(hashValue).toBe('hashedValue')
  })
  test('should call compare with correct values', async () => {
    const salt = 12
    const sut = makeSut(salt)
    const compareSpy = jest.spyOn(bcrypt, 'compare')

    await sut.compare('value', 'hashedValueToCompare')

    expect(compareSpy).toHaveBeenCalledWith('value', 'hashedValueToCompare')
  })
  test('should return a true when compare succsseds ', async () => {
    const salt = 12
    const sut = makeSut(salt)

    const isValid = await sut.compare('anyValue', 'anyHash')

    expect(isValid).toBe(true)
  })
  test('should return a false when compare fails', async () => {
    const salt = 12
    const sut = makeSut(salt)

    jest.spyOn(bcrypt, 'compare').mockImplementationOnce(async () => await Promise.resolve(false))

    const isValid = await sut.compare('anyValue', 'anyHash')

    expect(isValid).toBe(false)
  })
})
