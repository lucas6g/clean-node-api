
import { TokenGenerator } from '../../../data/protocols/cryptography/TokenGenerator'
import { sign, verify } from 'jsonwebtoken'
import { TokenVerifier } from '../../../data/protocols/cryptography/TokenVerifier'


export class JwtAdpter implements TokenGenerator, TokenVerifier {
    private readonly secret: string

    constructor(secret: string) {
        this.secret = secret
    }

    async generate(value: string): Promise<string> {
        const token = sign({ id: value }, this.secret)
        return await Promise.resolve(token)
    }
    async verify(token: string): Promise<string | null> {
        const value = verify(token, this.secret) as string

        return await Promise.resolve(value)
    }


}
