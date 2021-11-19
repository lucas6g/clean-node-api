import { EmailValidatorAdpter } from './EmailValidatorAdpter'
import validator from 'validator'

// classe mocada pelo jest
jest.mock('validator', () => {
  return {
    isEmail (): boolean {
      return true
    }
  }
})

describe('EmailValidatorAdpter', () => {
  test('should return false if validator return false', () => {
    const sut = new EmailValidatorAdpter()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalidEmail@mail.com')

    expect(isValid).toBe(false)
  })
  test('should return true if validator return true', () => {
    const sut = new EmailValidatorAdpter()
    const isValid = sut.isValid('validEmail@mail.com')

    expect(isValid).toBe(true)
  })
  test('should call validator whith correct email', () => {
    const sut = new EmailValidatorAdpter()
    const isEmailSpy = jest.spyOn(validator, 'isEmail')
    sut.isValid('anyEmail@mail.com')

    expect(isEmailSpy).toHaveBeenCalledWith('anyEmail@mail.com')
  })
})
