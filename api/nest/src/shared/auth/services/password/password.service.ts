import { Injectable } from "@nestjs/common";

import { PasswordEncryptor } from "~/shared/auth/services/password/password.encryptor";

@Injectable()
export class PasswordService {
  constructor(private readonly passwordEncryptor: PasswordEncryptor) {}

  encrypt(password: string): Promise<string> {
    return this.passwordEncryptor.encrypt(password);
  }

  verify(password: string, hash: string): Promise<boolean> {
    return this.passwordEncryptor.compare(password, hash);
  }
}
