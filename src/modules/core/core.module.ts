import { Module } from '@nestjs/common';

import { I18nConfigModule } from '../../i18n';
import { ConfigEnvironmentModule } from './config-environment';
import { DatabaseModule } from './database';

@Module({
  imports: [ConfigEnvironmentModule, DatabaseModule, I18nConfigModule],
})
export class CoreModule {}
