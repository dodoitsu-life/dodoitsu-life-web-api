import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterThemeId1704127502175 implements MigrationInterface {
  name = 'AlterThemeId1704127502175';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "dodoitsu" DROP CONSTRAINT "FK_e7732fc98d45f8e8e1e7e3cac64"`,
    );
    await queryRunner.query(
      `ALTER TABLE "theme" DROP CONSTRAINT "PK_c1934d0b4403bf10c1ab0c18166"`,
    );
    await queryRunner.query(`ALTER TABLE "theme" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "theme" ADD "id" uuid NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "theme" ADD CONSTRAINT "PK_c1934d0b4403bf10c1ab0c18166" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(`ALTER TABLE "dodoitsu" DROP COLUMN "themeId"`);
    await queryRunner.query(`ALTER TABLE "dodoitsu" ADD "themeId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "dodoitsu" ADD CONSTRAINT "FK_e7732fc98d45f8e8e1e7e3cac64" FOREIGN KEY ("themeId") REFERENCES "theme"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "dodoitsu" DROP CONSTRAINT "FK_e7732fc98d45f8e8e1e7e3cac64"`,
    );
    await queryRunner.query(`ALTER TABLE "dodoitsu" DROP COLUMN "themeId"`);
    await queryRunner.query(`ALTER TABLE "dodoitsu" ADD "themeId" integer`);
    await queryRunner.query(
      `ALTER TABLE "theme" DROP CONSTRAINT "PK_c1934d0b4403bf10c1ab0c18166"`,
    );
    await queryRunner.query(`ALTER TABLE "theme" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "theme" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "theme" ADD CONSTRAINT "PK_c1934d0b4403bf10c1ab0c18166" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "dodoitsu" ADD CONSTRAINT "FK_e7732fc98d45f8e8e1e7e3cac64" FOREIGN KEY ("themeId") REFERENCES "theme"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
