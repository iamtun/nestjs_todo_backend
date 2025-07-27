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
    UNIQUES: { EMAIL: `${UNIQUE_PREFIX}${TABLE_NAMES.USER}_email` },
  },
  USER_TOKENS_COLUMNS: {
    USER_ID: 'userId',
    REFRESH_TOKEN_HASH: 'refresh_token_hash',
    IS_REVOKED: 'is_revoked',
    EXPIRED_AT: 'expired_at',
    UNIQUES: {
      REFRESH_TOKEN_HASH: `${UNIQUE_PREFIX}${TABLE_NAMES.USER_TOKENS}_refresh_token_hash`,
    },
    FOREIGN_KEYS: {
      USER_ID: `${FOREIGN_KEY_PREFIX}${TABLE_NAMES.USER_TOKENS}_${TABLE_NAMES.USER}_user_id`,
    },
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
