import { OmitType } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTranslations } from 'src/i18n/i18n.generated';

export class RegisterDto {
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>(
      'validation.email.EMAIL_ERR_001',
    ),
  })
  @IsString()
  @IsEmail(undefined, {
    message: i18nValidationMessage<I18nTranslations>(
      'validation.email.EMAIL_ERR_002',
    ),
  })
  email: string;

  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>(
      'validation.password.PASSWORD_ERR_001',
    ),
  })
  @IsString()
  @MinLength(6, {
    message: i18nValidationMessage<I18nTranslations>(
      'validation.password.PASSWORD_ERR_002',
    ),
  })
  @MaxLength(20, {
    message: i18nValidationMessage<I18nTranslations>(
      'validation.password.PASSWORD_ERR_002',
    ),
  })
  password: string;

  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>(
      'validation.first_name.FIRST_NAME_ERR_001',
    ),
  })
  @IsString()
  @MinLength(2, {
    message: i18nValidationMessage<I18nTranslations>(
      'validation.first_name.FIRST_NAME_ERR_002',
    ),
  })
  firstName: string;

  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>(
      'validation.last_name.LAST_NAME_ERR_001',
    ),
  })
  @IsString()
  @MinLength(2, {
    message: i18nValidationMessage<I18nTranslations>(
      'validation.last_name.LAST_NAME_ERR_002',
    ),
  })
  lastName: string;
}

export class LoginDto extends OmitType(RegisterDto, [
  'firstName',
  'lastName',
]) {}
