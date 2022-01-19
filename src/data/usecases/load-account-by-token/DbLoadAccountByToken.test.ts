
import { TokenVerifier } from '../../protocols/cryptography/TokenVerifier'
import { DbLoadAccountByToken } from './DbLoadAccountByToken'

class TokenVerifierStub implements TokenVerifier {
    async verify(token: string): Promise<string> {

        return Promise.resolve('anyValue')

    }
}



describe('DbLoadAccountByToken', () => {
    test('should call TokenVerifier whit correct values', async () => {


        const tokenVerifierStub = new TokenVerifierStub()
        const sut = new DbLoadAccountByToken(tokenVerifierStub)



        const verifySpy = jest.spyOn(tokenVerifierStub, 'verify')

        await sut.getByToken('anyToken', 'anyRole')


        expect(verifySpy).toHaveBeenCalledWith('anyToken')


    })
})