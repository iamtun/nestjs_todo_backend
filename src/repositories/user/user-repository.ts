import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RepositoryBase } from '@repositories/repository.base';
import { User } from '@shared/entities';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository extends RepositoryBase<User> {
  constructor(
    @InjectRepository(User)
    public repository: Repository<User>,
  ) {
    super(repository);
  }
}
