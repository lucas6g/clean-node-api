import { EmailValidatorAdpter } from './EmailValidatorAdpter'

describe('EmailValidatorAdpter', () => {
  test('should return false if validator return false', () => {
    const sut = new EmailValidatorAdpter()
    const isValid = sut.isValid('invalidEmail@mail.com')

    expect(isValid).toBe(false)
  })
})
