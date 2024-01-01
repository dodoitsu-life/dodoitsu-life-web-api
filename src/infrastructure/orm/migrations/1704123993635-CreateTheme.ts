import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTheme1704123993635 implements MigrationInterface {
  name = 'CreateTheme1704123993635';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "theme" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "startDate" TIMESTAMP NOT NULL, "endDate" TIMESTAMP NOT NULL, CONSTRAINT "PK_c1934d0b4403bf10c1ab0c18166" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "dodoitsu" ADD "themeId" integer`);
    await queryRunner.query(
      `ALTER TABLE "dodoitsu" ADD CONSTRAINT "FK_e7732fc98d45f8e8e1e7e3cac64" FOREIGN KEY ("themeId") REFERENCES "theme"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "dodoitsu" DROP CONSTRAINT "FK_e7732fc98d45f8e8e1e7e3cac64"`,
    );
    await queryRunner.query(`ALTER TABLE "dodoitsu" DROP COLUMN "themeId"`);
    await queryRunner.query(`DROP TABLE "theme"`);
  }
}
