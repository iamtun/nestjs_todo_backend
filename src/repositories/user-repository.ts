import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities';
import { RepositoryBase } from './repository.base';

@Injectable()
export class UserRepository extends RepositoryBase<User> {
  constructor(
    @InjectRepository(User)
    public repository: Repository<User>,
  ) {
    super(repository);
  }
}
