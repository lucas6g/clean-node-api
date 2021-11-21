import { Encrypter } from '../../data/protocols/Encrypter'
import bcrypt from 'bcrypt'

export class BcryptAdpter implements Encrypter {
  private readonly salt: number

  constructor (salt: number) {
    this.salt = salt
  }

  async encrypt (value: string): Promise<string> {
    return await bcrypt.hash(value, this.salt)
  }
}
