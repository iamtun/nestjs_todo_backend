import { TABLE_NAMES, USER_ENTITY_DOMAIN } from '@shared/constants';
import { compare, encrypt } from '@shared/helpers/security.helper';
import { BeforeInsert, Column, Entity, Index, OneToMany } from 'typeorm';

import { BaseEntitySoftDelete } from '../base.entity';
import { UserToken } from './user-token.entity';

@Entity(TABLE_NAMES.USER)
export class User extends BaseEntitySoftDelete {
  @Column({
    name: USER_ENTITY_DOMAIN.USER_COLUMNS.EMAIL,
    type: 'varchar',
    length: 50,
  })
  @Index(USER_ENTITY_DOMAIN.USER_COLUMNS.UNIQUES.EMAIL, { unique: true })
  email: string;

  @Column({
    name: USER_ENTITY_DOMAIN.USER_COLUMNS.PASSWORD,
    type: 'varchar',
    length: 100,
  })
  password: string;

  @Column({
    name: USER_ENTITY_DOMAIN.USER_COLUMNS.FIRST_NAME,
    type: 'varchar',
    length: 50,
  })
  firstName: string;

  @Column({
    name: USER_ENTITY_DOMAIN.USER_COLUMNS.LAST_NAME,
    type: 'varchar',
    length: 50,
  })
  lastName: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await encrypt(this.password);
  }

  async comparePassword(password: string): Promise<boolean> {
    return await compare(password, this.password);
  }

  @OneToMany(() => UserToken, (userToken) => userToken.userId)
  userTokens?: UserToken[];
}
