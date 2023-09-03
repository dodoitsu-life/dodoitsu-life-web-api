import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAuthorIdForDodoitsu1693759170478 implements MigrationInterface {
  name = 'AddAuthorIdForDodoitsu1693759170478';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "dodoitsu" RENAME COLUMN "likes" TO "authorId"`,
    );
    await queryRunner.query(`ALTER TABLE "dodoitsu" DROP COLUMN "authorId"`);
    await queryRunner.query(`ALTER TABLE "dodoitsu" ADD "authorId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "dodoitsu" ADD CONSTRAINT "FK_cfc18c1edf5480151dc00fe8bb0" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "dodoitsu" DROP CONSTRAINT "FK_cfc18c1edf5480151dc00fe8bb0"`,
    );
    await queryRunner.query(`ALTER TABLE "dodoitsu" DROP COLUMN "authorId"`);
    await queryRunner.query(
      `ALTER TABLE "dodoitsu" ADD "authorId" integer NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "dodoitsu" RENAME COLUMN "authorId" TO "likes"`,
    );
  }
}
