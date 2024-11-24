import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcryptjs";

@Injectable()
export class PasswordEncryptor {
  async encrypt(password: string): Promise<string> {
    try {
      return await bcrypt.hash(password, 10);
    } catch (e) {
      throw Error; // @todo Error
    }
  }

  async compare(rawPassword: string, hashPassword: string): Promise<boolean> {
    try {
      return await bcrypt.compare(rawPassword, hashPassword);
    } catch (e) {
      throw Error; // @todo Error
    }
  }
}
