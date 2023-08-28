import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1693158656667 implements MigrationInterface {
  name = 'Init1693158656667';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "dodoitsu" ("id" SERIAL NOT NULL, "content" character varying NOT NULL, "description" character varying, "likes" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_272851b205678880e67dea38c30" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL, "twitterId" character varying NOT NULL, "name" character varying NOT NULL, "photo" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "refreshToken" character varying, CONSTRAINT "UQ_fbcf1fac85c4b6bd636a50559c1" UNIQUE ("twitterId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "dodoitsu"`);
  }
}
