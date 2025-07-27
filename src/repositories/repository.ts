import { Injectable } from '@nestjs/common';

import { UserRepository } from './user';
import { UserTokenRepository } from './user/user-token-repository';

@Injectable()
export class Repository {
  constructor(
    public readonly userRepository: UserRepository,
    public readonly userTokenRepository: UserTokenRepository,
  ) {}
}
