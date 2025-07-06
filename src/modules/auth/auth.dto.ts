import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTranslations } from 'src/i18n/i18n.generated';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty({})
  @IsString()
  password: string;

  @IsNotEmpty({})
  @IsString()
  firstName: string;

  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>(
      'validation.LAST_NAME.LAST_NAME_ERR_001',
    ),
  })
  @IsString()
  lastName: string;
}
