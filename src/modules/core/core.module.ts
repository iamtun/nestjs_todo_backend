import { Module } from '@nestjs/common';

import { ConfigEnvironmentModule } from './config-environment/config-environment.module';
import { DatabaseModule } from './database/database.module';

@Module({ imports: [ConfigEnvironmentModule, DatabaseModule] })
export class CoreModule {}
