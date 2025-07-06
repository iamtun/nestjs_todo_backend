import { Module } from '@nestjs/common';

import { ConfigEnvironmentModule } from './config-environment';
import { DatabaseModule } from './database';

@Module({ imports: [ConfigEnvironmentModule, DatabaseModule] })
export class CoreModule {}
