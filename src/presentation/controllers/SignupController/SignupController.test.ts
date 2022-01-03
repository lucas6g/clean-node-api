
import { Account } from '../../../domain/entities/Account'
import { AddAccount, AddAccountModel } from '../../../domain/usecases/AddAccount'
import { SignupController } from './SignupController'

import { ServerError } from '../../errors/ServerError'

import { HttpRequest } from '../../protocols/Http'
import { Validation } from '../../helpers/validators/Validation'

const makeValidationStub = (): Validation => {
  // dependencia mockada
  class ValidationStub implements Validation {
    validate(input: any): Error | null {
      return null
    }
  }
  return new ValidationStub()
}

const makeAddAccount = (): AddAccount => {
  // dependencia mockada
  class AddAccountStub implements AddAccount {
    async add(account: AddAccountModel): Promise<Account> {
      const fakeAccount = {
        id: 'validId',
        name: 'validName',
        email: 'validEmail@mail.com',
        password: 'validPassword'

      }
      return await new Promise(resolve => resolve(fakeAccount))
    }
  }
  return new AddAccountStub()
}
interface SutTypes {
  sut: SignupController

  addAccountStub: AddAccount
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const addAccountStub = makeAddAccount()
  const validationStub = makeValidationStub()
  const sut = new SignupController(addAccountStub, validationStub)

  return {
    sut,
    addAccountStub,
    validationStub

  }
}

const makeFakeHttpRequest = (): HttpRequest => {
  return {
    body: {
      name: 'anyName',
      email: 'anyEmail@mail.com',
      password: 'anyPassword',
      passwordConfirmation: 'anyPassword'

    }
  }
}

describe('Signup Controller', () => {
  test('should call add acount whit correct values', async () => {
    const { sut, addAccountStub } = makeSut()

    const addSpy = jest.spyOn(addAccountStub, 'add')

    const httpRequest = makeFakeHttpRequest()

    await sut.handle(httpRequest)

    expect(addSpy).toHaveBeenCalledWith({
      name: 'anyName',
      email: 'anyEmail@mail.com',
      password: 'anyPassword'
    })
  })
  test('should return 500 if AddAccount throws an exeption', async () => {
    const { sut, addAccountStub } = makeSut()

    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpRequest = makeFakeHttpRequest()

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError(httpResponse.body.stack))
  })

  test('should return 201 if valid data is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = makeFakeHttpRequest()

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(201)
    expect(httpResponse.body).toEqual({
      id: 'validId',
      name: 'validName',
      email: 'validEmail@mail.com',
      password: 'validPassword'

    })
  })

  test('should call Validation whit correct value', async () => {
    const { sut, validationStub } = makeSut()

    const validateSpy = jest.spyOn(validationStub, 'validate')

    const httpRequest = makeFakeHttpRequest()

    await sut.handle(httpRequest)

    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })
  test('should return 400 if Validation return error', async () => {
    const { sut, validationStub } = makeSut()

    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())

    const httpRequest = makeFakeHttpRequest()

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error())
  })
})
