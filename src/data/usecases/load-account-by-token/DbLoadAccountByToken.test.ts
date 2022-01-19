
import { LoadAccountByToken } from '../../../domain/usecases/LoadAccountByToken'
import { TokenVerifier } from '../../protocols/cryptography/TokenVerifier'
import { DbLoadAccountByToken } from './DbLoadAccountByToken'



const makeTokenVerifierStub = (): TokenVerifier => {
    class TokenVerifierStub implements TokenVerifier {
        async verify(token: string): Promise<string> {

            return Promise.resolve('anyValue')

        }
    }
    return new TokenVerifierStub()
}
interface SutTypes {
    sut: LoadAccountByToken
    tokenVerifierStub: TokenVerifier


}
const makeSut = (): SutTypes => {

    const tokenVerifierStub = makeTokenVerifierStub()


    const sut = new DbLoadAccountByToken(tokenVerifierStub)

    return {
        sut,
        tokenVerifierStub

    }
}


describe('DbLoadAccountByToken', () => {
    test('should call TokenVerifier whit correct values', async () => {

        const { tokenVerifierStub, sut } = makeSut()

        const verifySpy = jest.spyOn(tokenVerifierStub, 'verify')

        await sut.getByToken('anyToken', 'anyRole')


        expect(verifySpy).toHaveBeenCalledWith('anyToken')


    })
    test('should returns null if TokenVerifier returns null', async () => {

        const { sut, tokenVerifierStub } = makeSut()



        jest.spyOn(tokenVerifierStub, 'verify').mockReturnValue(Promise.resolve(null))

        const account = await sut.getByToken('anyToken', 'anyRole')


        expect(account).toBeNull()


    })
})