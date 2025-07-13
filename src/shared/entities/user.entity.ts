import { TABLE_NAMES, USER_ENTITY_DOMAIN } from '@shared/constants';
import * as bcrypt from 'bcrypt';
import { BeforeInsert, Column, Entity, Index } from 'typeorm';

import { BaseEntitySoftDelete } from './base.entity';

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

  @Column({
    name: USER_ENTITY_DOMAIN.USER_COLUMNS.CURRENT_HASHED_REFRESH_TOKEN,
    type: 'varchar',
    nullable: true,
  })
  currentHashedRefreshToken?: string | null;

  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  async comparePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}
