import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RepositoryBase } from '@repositories/repository.base';
import { UserToken } from '@shared/entities';
import { Repository } from 'typeorm';

@Injectable()
export class UserTokenRepository extends RepositoryBase<UserToken> {
  constructor(
    @InjectRepository(UserToken)
    public repository: Repository<UserToken>,
  ) {
    super(repository);
  }
}
