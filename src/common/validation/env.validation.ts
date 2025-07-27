import { plainToInstance } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
  validateSync,
} from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

class EnvironmentVariables {
  @IsNotEmpty()
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(65535)
  PORT: number;

  @IsNotEmpty()
  POSTGRES_HOST: string;

  @IsNotEmpty()
  @IsNumber()
  POSTGRES_PORT: number;

  @IsNotEmpty()
  POSTGRES_USER: string;

  @IsNotEmpty()
  POSTGRES_PASSWORD: string;

  @IsNotEmpty()
  POSTGRES_DATABASE: string;

  @IsNotEmpty()
  @IsBoolean()
  DEBUG_LOGGING_TYPE_ORM: boolean;

  @IsNotEmpty()
  @IsString()
  JWT_SECRET_KEY: string;

  @IsNotEmpty()
  @IsString()
  JWT_EXPIRATION_TIME: string;

  @IsNotEmpty()
  @IsString()
  JWT_REFRESH_SECRET_KEY: string;

  @IsNotEmpty()
  @IsString()
  JWT_REFRESH_EXPIRATION_TIME: string;
}

export const validate = (config: Record<string, any>): Record<string, any> => {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    const errorMessages = errors
      .map((error) => {
        return `${error.property} - ${Object.values(error.constraints || {}).join(', ')};`;
      })
      .join('\n');

    throw new Error(`Configuration validation failed:\n${errorMessages}`);
  }

  return validatedConfig as unknown as Record<string, any>;
};
