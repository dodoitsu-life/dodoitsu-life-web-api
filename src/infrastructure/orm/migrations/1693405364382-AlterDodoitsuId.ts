import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterDodoitsuId1693405364382 implements MigrationInterface {
  name = 'AlterDodoitsuId1693405364382';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "dodoitsu" DROP CONSTRAINT "PK_272851b205678880e67dea38c30"`,
    );
    await queryRunner.query(`ALTER TABLE "dodoitsu" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "dodoitsu" ADD "id" uuid NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "dodoitsu" ADD CONSTRAINT "PK_272851b205678880e67dea38c30" PRIMARY KEY ("id")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "dodoitsu" DROP CONSTRAINT "PK_272851b205678880e67dea38c30"`,
    );
    await queryRunner.query(`ALTER TABLE "dodoitsu" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "dodoitsu" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "dodoitsu" ADD CONSTRAINT "PK_272851b205678880e67dea38c30" PRIMARY KEY ("id")`,
    );
  }
}
