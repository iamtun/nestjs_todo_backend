import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserTokenCreateNewTable1753625452774
  implements MigrationInterface
{
  name = 'UserTokenCreateNewTable1753625452774';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "user_tokens" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "userId" uuid NOT NULL,
                "refresh_token_hash" character varying(100) NOT NULL,
                "is_revoked" boolean NOT NULL DEFAULT false,
                "expired_at" TIMESTAMP,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "createdBy" character varying(50),
                CONSTRAINT "UQ_user_tokens_refresh_token_hash" UNIQUE ("refresh_token_hash"),
                CONSTRAINT "PK_63764db9d9aaa4af33e07b2f4bf" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "currentHashedRefreshToken"
        `);
    await queryRunner.query(`
            ALTER TABLE "user_tokens"
            ADD CONSTRAINT "FK_user_tokens_users_user_id" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "user_tokens" DROP CONSTRAINT "FK_user_tokens_users_user_id"
        `);
    await queryRunner.query(`
            ALTER TABLE "users"
            ADD "currentHashedRefreshToken" character varying
        `);
    await queryRunner.query(`
            DROP TABLE "user_tokens"
        `);
  }
}
