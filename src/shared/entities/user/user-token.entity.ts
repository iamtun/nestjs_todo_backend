import { TABLE_NAMES, USER_ENTITY_DOMAIN } from '@shared/constants';
import { encrypt } from '@shared/helpers/security.helper';
import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';

import { BaseEntity } from '../base.entity';
import { User } from './user.entity';

@Entity(TABLE_NAMES.USER_TOKENS)
@Unique(USER_ENTITY_DOMAIN.USER_TOKENS_COLUMNS.UNIQUES.REFRESH_TOKEN_HASH, [
  'refreshTokenHash',
])
export class UserToken extends BaseEntity {
  @Column({
    name: USER_ENTITY_DOMAIN.USER_TOKENS_COLUMNS.USER_ID,
    type: 'uuid',
  })
  userId: string;

  @Column({
    name: USER_ENTITY_DOMAIN.USER_TOKENS_COLUMNS.REFRESH_TOKEN_HASH,
    type: 'varchar',
    length: 100,
  })
  refreshTokenHash: string;

  @Column({
    name: USER_ENTITY_DOMAIN.USER_TOKENS_COLUMNS.IS_REVOKED,
    type: 'boolean',
    default: false,
  })
  isRevoked: boolean;

  @Column({
    name: USER_ENTITY_DOMAIN.USER_TOKENS_COLUMNS.EXPIRED_AT,
    type: 'timestamp',
    nullable: true,
  })
  expiredAt?: Date;

  @ManyToOne(() => User, (user) => user.userTokens, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: USER_ENTITY_DOMAIN.USER_TOKENS_COLUMNS.USER_ID,
    foreignKeyConstraintName:
      USER_ENTITY_DOMAIN.USER_TOKENS_COLUMNS.FOREIGN_KEYS.USER_ID,
  })
  user: User;

  async hashRefreshToken(refreshToken: string): Promise<string> {
    return await encrypt(refreshToken);
  }
}
