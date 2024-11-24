import { Inject, Injectable } from "@nestjs/common";

import { ID } from "@d-type/id.type";

import { IAuthToken } from "@domain/auth/dto/token.auth.type";
import {
  IUserPersistenceRepository,
  USER_PERSISTENCE_REPOSITORY,
} from "@domain/user/user.repository.type";
import { IUser } from "@domain/user/user.type";

import { TokenEncryptor } from "~/shared/auth/services/token/token.encryptor";
import { TokenEnum } from "~/shared/auth/services/token/token.enum";

@Injectable()
export class TokenService {
  constructor(
    private readonly tokenEncryptor: TokenEncryptor,
    @Inject(USER_PERSISTENCE_REPOSITORY)
    private readonly userPRepository: IUserPersistenceRepository,
  ) {}

  async verifyAccessToken(token: string): Promise<IUser | null> {
    return this.verifyToken(token, TokenEnum.ACCESS);
  }

  async refreshToken(refreshToken: string): Promise<IAuthToken> {
    const user = await this.verifyToken(refreshToken, TokenEnum.REFRESH);
    if (!user) {
      throw Error; // @todo Error
    }
    return this.generateToken(user.id);
  }

  async generateToken(id: ID): Promise<IAuthToken> {
    return {
      token: this.tokenEncryptor.encrypt({ userId: id }, TokenEnum.ACCESS),
      refreshToken: this.tokenEncryptor.encrypt(
        { userId: id },
        TokenEnum.REFRESH,
      ),
      tokenExpiresAt: this.tokenEncryptor.getExpiration(TokenEnum.ACCESS),
    };
  }

  private async verifyToken(
    token: string,
    type: TokenEnum,
  ): Promise<IUser | null> {
    const payload = this.tokenEncryptor.verify(token, type);
    try {
      return await this.userPRepository.getById(payload.userId);
    } catch {
      return null;
    }
  }
}
