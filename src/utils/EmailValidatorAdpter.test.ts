import { EmailValidatorAdpter } from './EmailValidatorAdpter'
import validator from 'validator'
import { EmailValidator } from '../presentation/protocols/EmailValidator'

// dependencia externa mocada pelo jest
jest.mock('validator', () => {
  return {
    isEmail(): boolean {
      return true
    }
  }
})

const makeSut = (): EmailValidator => {
  return new EmailValidatorAdpter()
}

describe('EmailValidatorAdpter', () => {
  test('should return false if validator return false', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalidEmail@mail.com')

    expect(isValid).toBe(false)
  })
  test('should return true if validator return true', () => {
    const sut = makeSut()
    const isValid = sut.isValid('validEmail@mail.com')

    expect(isValid).toBe(true)
  })
  test('should call validator whith correct email', () => {
    const sut = makeSut()
    const isEmailSpy = jest.spyOn(validator, 'isEmail')
    sut.isValid('anyEmail@mail.com')

    expect(isEmailSpy).toHaveBeenCalledWith('anyEmail@mail.com')
  })
})
