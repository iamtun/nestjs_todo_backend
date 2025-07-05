import { validate } from '@common/validation';
import { Module } from '@nestjs/common';
import { ConfigFactory, ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validate as ConfigFactory,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
