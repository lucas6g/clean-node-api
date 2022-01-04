import { Hasher } from '../../data/protocols/cryptography/Hasher'
import bcrypt from 'bcrypt'
import { HashComparer } from '../../data/protocols/cryptography/HashComparer'

export class BcryptAdpter implements Hasher, HashComparer {
  private readonly salt: number

  constructor(salt: number) {
    this.salt = salt
  }

  async hash(value: string): Promise<string> {
    return await bcrypt.hash(value, this.salt)
  }

  async compare(value: string, valueToCompare: string): Promise<boolean> {
    return await bcrypt.compare(value, valueToCompare)
  }
}
