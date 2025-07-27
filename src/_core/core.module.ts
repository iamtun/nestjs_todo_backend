import { I18nConfigModule } from '@i18n/i18n.module';
import { Module } from '@nestjs/common';

import { ConfigEnvironmentModule } from './config-environment';
import { DatabaseModule } from './database';

@Module({
  imports: [ConfigEnvironmentModule, DatabaseModule, I18nConfigModule],
})
export class CoreModule {}
