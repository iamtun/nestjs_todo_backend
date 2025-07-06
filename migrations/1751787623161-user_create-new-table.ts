import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserCreateNewTable1751787623161 implements MigrationInterface {
  name = 'UserCreateNewTable1751787623161';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "users" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "email" character varying(50) NOT NULL,
                "password" character varying(100) NOT NULL,
                "firstName" character varying(50) NOT NULL,
                "lastName" character varying(50) NOT NULL,
                "currentHashedRefreshToken" character varying,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "createdBy" character varying(50),
                "updatedAt" TIMESTAMP DEFAULT now(),
                "updatedBy" character varying(50),
                "deletedAt" TIMESTAMP DEFAULT now(),
                "deletedBy" character varying(50),
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE UNIQUE INDEX "UQ_users_email" ON "users" ("email")
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP INDEX "public"."UQ_users_email"
        `);
    await queryRunner.query(`
            DROP TABLE "users"
        `);
  }
}
