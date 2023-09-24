import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCreatedAt1695569514020 implements MigrationInterface {
  name = 'AddCreatedAt1695569514020';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "dodoitsu_like" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "dodoitsu_like" DROP COLUMN "createdAt"`,
    );
  }
}
