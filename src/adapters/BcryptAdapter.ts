import bcrypt from 'bcrypt';

import { PasswordHasher } from '../domain/interfaces/cryptography/IPasswordHasher';

export default class BcryptAdapter implements PasswordHasher {
  constructor(private readonly saltRounds = 12) {}

  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
