import { TABLE_NAMES } from './table.constant';

export const UNIQUE_PREFIX = 'UQ_';
export const PRIMARY_KEY_PREFIX = 'PK_';
export const FOREIGN_KEY_PREFIX = 'FK_';
export const INDEX_PREFIX = 'IDX_';

export const USER_ENTITY_DOMAIN = {
  USER_COLUMNS: {
    EMAIL: 'email',
    PASSWORD: 'password',
    FIRST_NAME: 'firstName',
    LAST_NAME: 'lastName',
    CURRENT_HASHED_REFRESH_TOKEN: 'currentHashedRefreshToken',
    UNIQUES: { EMAIL: `${UNIQUE_PREFIX}${TABLE_NAMES.USER}_email` },
  },
};

export const BASE_ENTITY_DOMAIN = {
  BASE_COLUMNS: {
    ID: 'id',
    CREATED_AT: 'createdAt',
    CREATED_BY: 'createdBy',
    UPDATED_AT: 'updatedAt',
    UPDATED_BY: 'updatedBy',
    DELETED_AT: 'deletedAt',
    DELETED_BY: 'deletedBy',
  },
};
