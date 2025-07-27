import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, UserToken } from '@shared/entities';

import { UserRepository } from './user';
import { UserTokenRepository } from './user/user-token-repository';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User, UserToken])],
  providers: [UserRepository, UserTokenRepository],
  exports: [UserRepository, UserTokenRepository],
})
export class RepositoryModule {}
