import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

import { IAuthPasswordInput } from "@domain/auth/dto/password.auth.type";

@InputType()
export class AuthPasswordInput implements IAuthPasswordInput {
  @IsNotEmpty()
  @IsEmail()
  @Field(() => String)
  email: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  password: string;
}
