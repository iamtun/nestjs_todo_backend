import { Module } from '@nestjs/common';
import { Repository } from '@repositories/repository';

import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, Repository],
  exports: [UserService],
})
export class UserModule {}
