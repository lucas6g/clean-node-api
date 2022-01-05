import { Account } from '../../../domain/entities/Account'
import { HashComparer } from '../../protocols/cryptography/HashComparer'
import { TokenGenerator } from '../../protocols/cryptography/TokenGenerator'
import { UpdateTokenRepository } from '../../protocols/db/account/UpdateTokenRepository'
import { DbAuthentication } from './DbAuthentication'
import { LoadAccountByEmailRepository } from './LoadAccountByEmailRepository'

const makeFakeAccount = (): Account => {
    return {
        id: 'anyId',
        name: 'anyName',
        email: 'anyEmail@mail.com',
        password: 'hashedPassword'
    }
}

const makeLoadAccoutRepositoryStub = (): LoadAccountByEmailRepository => {
    // dependencia mockada
    class LoadAccoutRepositoryStub implements LoadAccountByEmailRepository {
        async getByEmail(email: string): Promise<Account | null> {
            const fakeAccount = makeFakeAccount()
            return await Promise.resolve(fakeAccount)
        }
    }
    return new LoadAccoutRepositoryStub()
}
const makeUpdateTokenRepositoryStub = (): UpdateTokenRepository => {
    // dependencia mockada
    class UpdateTokenRepositoryStub implements UpdateTokenRepository {
        async updateToken(id: string, token: string): Promise<void> {

        }
    }
    return new UpdateTokenRepositoryStub()
}

const makeHashComparerStub = (): HashComparer => {
    // dependencia mockada
    class HashComparerStub implements HashComparer {
        async compare(value: string, valueToCompare: string): Promise<boolean> {
            return true
        }
    }
    return new HashComparerStub()
}
const makeTokenGeneratorStub = (): TokenGenerator => {
    // dependencia mockada
    class TokenGeneratorStub implements TokenGenerator {
        async generate(id: string): Promise<string> {
            return 'anyToken'
        }
    }
    return new TokenGeneratorStub()
}

interface SutTypes {

    sut: DbAuthentication
    loadAccountRepositoryStub: LoadAccountByEmailRepository
    hashComparerStub: HashComparer
    tokenGeneratorStub: TokenGenerator
    updateTokenRepositoryStub: UpdateTokenRepository

}

const makeSut = (): SutTypes => {
    const loadAccountRepositoryStub = makeLoadAccoutRepositoryStub()
    const hashComparerStub = makeHashComparerStub()
    const tokenGeneratorStub = makeTokenGeneratorStub()
    const updateTokenRepositoryStub = makeUpdateTokenRepositoryStub()
    const sut = new DbAuthentication(loadAccountRepositoryStub, hashComparerStub, tokenGeneratorStub, updateTokenRepositoryStub)

    return {
        loadAccountRepositoryStub,
        updateTokenRepositoryStub,
        sut,
        hashComparerStub,
        tokenGeneratorStub
    }
}

describe('Db Authentication', () => {
    test('should call LoadAccountByEmailRepository whit correct email', async () => {
        const { sut, loadAccountRepositoryStub } = makeSut()

        const getByEmailSpy = jest.spyOn(loadAccountRepositoryStub, 'getByEmail')

        await sut.auth('anyEmail@mail.com', 'anyPassword')

        expect(getByEmailSpy).toHaveBeenCalledWith('anyEmail@mail.com')
    })
    test('should trows an error if LoadAccountByEmailRepository trows an error', async () => {
        const { sut, loadAccountRepositoryStub } = makeSut()

        jest.spyOn(loadAccountRepositoryStub, 'getByEmail').mockImplementationOnce(async () => {
            throw Error()
        })

        await expect(
            sut.auth('anyEmail@mail.com', 'anyPassword')
        ).rejects.toBeInstanceOf(Error)
    })
    test('should return null if LoadAccountByEmailRepository returs null ', async () => {
        const { sut, loadAccountRepositoryStub } = makeSut()

        jest.spyOn(loadAccountRepositoryStub, 'getByEmail').mockReturnValueOnce(Promise.resolve(null))

        const token = await sut.auth('anyEmail@mail.com', 'anyPassword')

        expect(token).toBeNull()
    })
    test('should call HashCompare whit correct password', async () => {
        const { sut, hashComparerStub } = makeSut()

        const compareSpy = jest.spyOn(hashComparerStub, 'compare')

        await sut.auth('anyEmail@mail.com', 'anyPassword')

        expect(compareSpy).toHaveBeenCalledWith('anyPassword', 'hashedPassword')
    })
    test('should trows an error if HashCompare trows an error', async () => {
        const { sut, hashComparerStub } = makeSut()

        jest.spyOn(hashComparerStub, 'compare').mockImplementationOnce(async () => {
            throw Error()
        })

        await expect(
            sut.auth('anyEmail@mail.com', 'anyPassword')
        ).rejects.toBeInstanceOf(Error)
    })
    test('should return null  if HashCompare retuns false', async () => {
        const { sut, hashComparerStub } = makeSut()

        jest.spyOn(hashComparerStub, 'compare').mockReturnValueOnce(Promise.resolve(false))

        const token = await sut.auth('anyEmail@mail.com', 'anyPassword')

        expect(token).toBeNull()
    })
    test('should call TokenGenerator whit correct id', async () => {
        const { sut, tokenGeneratorStub } = makeSut()

        const genetateSpy = jest.spyOn(tokenGeneratorStub, 'generate')

        await sut.auth('anyEmail@mail.com', 'anyPassword')

        expect(genetateSpy).toHaveBeenCalledWith('anyId')
    })
    test('should DbAuthentication returns a token on succsses', async () => {
        const { sut } = makeSut()

        const token = await sut.auth('anyEmail@mail.com', 'anyPassword')

        expect(token).toBe('anyToken')
    })
    test('should calls UpdateTokenRepository whit correct values', async () => {
        const { sut, updateTokenRepositoryStub } = makeSut()

        const updateSpy = jest.spyOn(updateTokenRepositoryStub, 'updateToken')

        await sut.auth('anyEmail@mail.com', 'anyPassword')

        expect(updateSpy).toHaveBeenCalledWith('anyId', 'anyToken')
    })

    test('should trows an error if UpdateTokenRepository trows an error', async () => {
        const { sut, updateTokenRepositoryStub } = makeSut()

        jest.spyOn(updateTokenRepositoryStub, 'updateToken').mockImplementationOnce(async () => {
            throw Error()
        })

        await expect(
            sut.auth('anyEmail@mail.com', 'anyPassword')
        ).rejects.toBeInstanceOf(Error)
    })
})
