import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

import { IAuthRefreshTokenInput } from "@domain/auth/dto/token.auth.type";

@InputType()
export class AuthRefreshTokenInput implements IAuthRefreshTokenInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  refreshToken: string;
}
