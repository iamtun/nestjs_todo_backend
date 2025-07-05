import { BASE_ENTITY_DOMAIN } from 'src/utils/constants';
import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: BASE_ENTITY_DOMAIN.BASE_COLUMNS.ID })
  id: string;

  @CreateDateColumn({
    name: BASE_ENTITY_DOMAIN.BASE_COLUMNS.CREATED_AT,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    name: BASE_ENTITY_DOMAIN.BASE_COLUMNS.CREATED_BY,
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  createdBy: string;
}

export abstract class BaseEntityUpdate extends BaseEntity {
  @CreateDateColumn({
    name: BASE_ENTITY_DOMAIN.BASE_COLUMNS.UPDATED_AT,
    type: 'timestamp',
    default: null,
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt?: Date;

  @Column({
    name: BASE_ENTITY_DOMAIN.BASE_COLUMNS.UPDATED_BY,
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  updatedBy?: string;
}

export abstract class BaseEntitySoftDelete extends BaseEntityUpdate {
  @CreateDateColumn({
    name: BASE_ENTITY_DOMAIN.BASE_COLUMNS.DELETED_AT,
    type: 'timestamp',
    default: null,
  })
  deletedAt?: Date;

  @Column({
    name: BASE_ENTITY_DOMAIN.BASE_COLUMNS.DELETED_BY,
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  deletedBy?: string;
}
