import { validate } from '@common/validation';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ConfigEnvironmentService } from './config-environment.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      validate: validate,
    }),
  ],
  providers: [ConfigEnvironmentService],
  exports: [ConfigEnvironmentService],
})
export class ConfigEnvironmentModule {}
