import { Injectable } from '@nestjs/common';

import { UserRepository } from './user-repository';

@Injectable()
export class Repository {
  constructor(public readonly userRepository: UserRepository) {}
}
