import { Hasher } from '../../data/protocols/cryptography/Hasher'
import bcrypt from 'bcrypt'

export class BcryptAdpter implements Hasher {
  private readonly salt: number

  constructor(salt: number) {
    this.salt = salt
  }

  async hash(value: string): Promise<string> {
    return await bcrypt.hash(value, this.salt)
  }
}
