
import { TokenGenerator } from '../../../data/protocols/cryptography/TokenGenerator'
import { sign } from 'jsonwebtoken'

export class JwtAdpter implements TokenGenerator {
    private readonly secret: string

    constructor(secret: string) {
        this.secret = secret
    }

    async generate(value: string): Promise<string> {
        const token = sign({ id: value }, this.secret)
        return await Promise.resolve(token)
    }
}
