import { plainToInstance } from "class-transformer";
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  IsUrl,
  MinLength,
  ValidationError,
  validateSync,
} from "class-validator";

export enum AppEnvEnum {
  LOCAL = "local",
  DEV = "dev",
  PREPROD = "preprod",
  PRODUCTION = "production",
}

enum JwtDurationsEnum {
  ONE_HOUR = "1h",
  HALF_DAY = "12h",
  ONE_DAY = "24h",
  ONE_WEEK = "168h",
  ONE_MONTH = "720h",
}

export class EnvironmentVariables {
  @IsNotEmpty()
  @IsEnum(AppEnvEnum)
  APP_ENV: AppEnvEnum;

  @IsNotEmpty()
  @IsString()
  DATABASE_HOST: string;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  DATABASE_PORT: number;

  @IsNotEmpty()
  @IsString()
  DATABASE_USERNAME: string;

  @IsNotEmpty()
  @IsString()
  DATABASE_PASSWORD: string;

  @IsNotEmpty()
  @IsString()
  DATABASE_DB: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(50)
  ACCESS_TOKEN_SECRET: string;

  @IsNotEmpty()
  @IsEnum(JwtDurationsEnum)
  ACCESS_TOKEN_EXPIRATION: JwtDurationsEnum;

  @IsNotEmpty()
  @IsString()
  @MinLength(50)
  REFRESH_TOKEN_SECRET: string;

  @IsNotEmpty()
  @IsEnum(JwtDurationsEnum)
  REFRESH_TOKEN_EXPIRATION: JwtDurationsEnum;

  @IsNotEmpty()
  @IsString()
  WEBAPP_DOMAINS: string;

  @IsNotEmpty()
  @IsUrl({ require_tld: false })
  APP_BASE_URL: string;

  @IsNotEmpty()
  @IsUrl({ require_tld: false })
  API_BASE_URL: string;

  @IsNotEmpty()
  @IsInt()
  THROTTLE_TTL: number;

  @IsNotEmpty()
  @IsInt()
  THROTTLE_LIMIT: number;

  @IsNotEmpty()
  @IsUrl({ require_tld: false })
  DISCORD_WEBHOOK: string;

  // * Tests

  @IsNotEmpty()
  @IsString()
  TEST_DATABASE_USERNAME: string;

  @IsNotEmpty()
  @IsString()
  TEST_DATABASE_PASSWORD: string;

  @IsNotEmpty()
  @IsString()
  TEST_DATABASE_DB: string;
}

// Learn more: https://docs.nestjs.com/techniques/configuration#custom-validate-function
export function validate(config: Record<string, unknown>) {
  const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (
    ACCESS_TOKEN_SECRET?.toLowerCase() === REFRESH_TOKEN_SECRET?.toLowerCase()
  ) {
    const error = new ValidationError();
    error.property = "ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET";
    error.constraints = {
      notEquals:
        "ACCESS_TOKEN_SECRET and REFRESH_TOKEN_SECRET must be different",
    };
    errors.push(error);
  }
  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
