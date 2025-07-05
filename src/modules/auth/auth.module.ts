import { Module } from '@nestjs/common';
import { Repository } from '@repositories/repository';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [],
  providers: [AuthService, Repository],
  controllers: [AuthController],
})
export class AuthModule {}
