import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDodoitsuLikes1695052241626 implements MigrationInterface {
  name = 'AddDodoitsuLikes1695052241626';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "dodoitsu_like" ("id" SERIAL NOT NULL, "userId" uuid, "dodoitsuId" uuid, CONSTRAINT "PK_e0e68a653544e89fe6699440302" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "dodoitsu_like" ADD CONSTRAINT "FK_f9644ab7a94465f9d2a1f920d06" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "dodoitsu_like" ADD CONSTRAINT "FK_c03174f4b3e8c7a68932965db70" FOREIGN KEY ("dodoitsuId") REFERENCES "dodoitsu"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "dodoitsu_like" DROP CONSTRAINT "FK_c03174f4b3e8c7a68932965db70"`,
    );
    await queryRunner.query(
      `ALTER TABLE "dodoitsu_like" DROP CONSTRAINT "FK_f9644ab7a94465f9d2a1f920d06"`,
    );
    await queryRunner.query(`DROP TABLE "dodoitsu_like"`);
  }
}
