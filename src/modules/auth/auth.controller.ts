import { I18nTranslations } from '@i18n/i18n.generated';
import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { I18n, I18nContext, I18nValidationExceptionFilter } from 'nestjs-i18n';

import { RegisterDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@UseFilters(new I18nValidationExceptionFilter())
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() body: RegisterDto,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ) {
    const testI18n = i18n.t('errors.USER.USER_ERR_001');
    console.log({ testI18n });
    return await this.authService.register(body);
  }
}
