import { Field, ObjectType } from "@nestjs/graphql";

import { IAuthToken } from "@domain/auth/dto/token.auth.type";

@ObjectType()
export class AuthTokenResponse implements IAuthToken {
  @Field(() => String)
  token: string;

  @Field(() => String)
  refreshToken: string;

  @Field(() => Date)
  tokenExpiresAt: Date;
}
