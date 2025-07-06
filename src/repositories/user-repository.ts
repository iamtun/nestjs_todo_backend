import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@shared/entities';
import { Repository } from 'typeorm';

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
