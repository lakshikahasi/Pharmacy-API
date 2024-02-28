import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1709050660068 implements MigrationInterface {
  name = "Init1709050660068";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "customer" ("id" varchar PRIMARY KEY NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "name" text NOT NULL)`
    );
    await queryRunner.query(
      `CREATE TABLE "medicine" ("id" varchar PRIMARY KEY NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "name" text NOT NULL, "description" varchar NOT NULL, "quantity" integer NOT NULL DEFAULT (0))`
    );
    await queryRunner.query(
      `CREATE TABLE "dispensed_medicine" ("id" varchar PRIMARY KEY NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "quantity" integer NOT NULL DEFAULT (0), "customerId" varchar, "medicineId" varchar)`
    );
    await queryRunner.query(
      `CREATE TABLE "role" ("id" varchar PRIMARY KEY NOT NULL, "name" text NOT NULL, CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name"))`
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" varchar PRIMARY KEY NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "username" text NOT NULL, "name" text NOT NULL, "password" text NOT NULL, "date" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "roleId" varchar)`
    );
    await queryRunner.query(
      `CREATE TABLE "active_session" ("id" varchar PRIMARY KEY NOT NULL, "token" text NOT NULL, "userId" text NOT NULL, "date" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP))`
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_dispensed_medicine" ("id" varchar PRIMARY KEY NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "quantity" integer NOT NULL DEFAULT (0), "customerId" varchar, "medicineId" varchar, CONSTRAINT "FK_5df2e39293611556547ddd14213" FOREIGN KEY ("customerId") REFERENCES "customer" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_a860bd0f9841ff37469e396291b" FOREIGN KEY ("medicineId") REFERENCES "medicine" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`
    );
    await queryRunner.query(
      `INSERT INTO "temporary_dispensed_medicine"("id", "createdAt", "updatedAt", "deletedAt", "quantity", "customerId", "medicineId") SELECT "id", "createdAt", "updatedAt", "deletedAt", "quantity", "customerId", "medicineId" FROM "dispensed_medicine"`
    );
    await queryRunner.query(`DROP TABLE "dispensed_medicine"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_dispensed_medicine" RENAME TO "dispensed_medicine"`
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_user" ("id" varchar PRIMARY KEY NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "username" text NOT NULL, "name" text NOT NULL, "password" text NOT NULL, "date" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "roleId" varchar, CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`
    );
    await queryRunner.query(
      `INSERT INTO "temporary_user"("id", "createdAt", "updatedAt", "deletedAt", "username", "name", "password", "date", "roleId") SELECT "id", "createdAt", "updatedAt", "deletedAt", "username", "name", "password", "date", "roleId" FROM "user"`
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);

    await queryRunner.query(
      `INSERT INTO role ("id", "name") VALUES("5c194401-0c31-4bbf-80a1-ee2dfd405899", 'owner')`
    );
    await queryRunner.query(
      `INSERT INTO role ("id", "name") VALUES("95d143d7-fa93-44f6-af48-0306bac051e2", 'manager')`
    );
    await queryRunner.query(
      `INSERT INTO role ("id", "name") VALUES("440bd63f-eade-40d3-abf5-47d37a44fbf0", 'cashier')`
    );

    await queryRunner.query(
      `INSERT INTO user ("id","name","username","password","roleId") VALUES("37b4ef2f-d9fe-44ff-ac7b-35eb68958afa",'owner','owner',"$2b$10$aHdaKKrY9zxzZhHQRUHKR.rDYWPA1R7jBdQ//bRElD.4L8QmZj.12","5c194401-0c31-4bbf-80a1-ee2dfd405899")`
    );
    await queryRunner.query(
      `INSERT INTO user ("id","name","username","password","roleId") VALUES("422a2c82-dfca-4133-a667-e4e623bd1730",'manager','manager',"$2b$10$aHdaKKrY9zxzZhHQRUHKR.rDYWPA1R7jBdQ//bRElD.4L8QmZj.12","95d143d7-fa93-44f6-af48-0306bac051e2" )`
    );
    await queryRunner.query(
      `INSERT INTO user ("id","name","username","password","roleId") VALUES("ab46eaa8-c45d-439c-bd71-f8f67b698a1e",'cashier','cashier',"$2b$10$aHdaKKrY9zxzZhHQRUHKR.rDYWPA1R7jBdQ//bRElD.4L8QmZj.12","440bd63f-eade-40d3-abf5-47d37a44fbf0")`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
    await queryRunner.query(
      `CREATE TABLE "user" ("id" varchar PRIMARY KEY NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "username" text NOT NULL, "name" text NOT NULL, "password" text NOT NULL, "date" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "roleId" varchar)`
    );
    await queryRunner.query(
      `INSERT INTO "user"("id", "createdAt", "updatedAt", "deletedAt", "username", "name", "password", "date", "roleId") SELECT "id", "createdAt", "updatedAt", "deletedAt", "username", "name", "password", "date", "roleId" FROM "temporary_user"`
    );
    await queryRunner.query(`DROP TABLE "temporary_user"`);
    await queryRunner.query(
      `ALTER TABLE "dispensed_medicine" RENAME TO "temporary_dispensed_medicine"`
    );
    await queryRunner.query(
      `CREATE TABLE "dispensed_medicine" ("id" varchar PRIMARY KEY NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "quantity" integer NOT NULL DEFAULT (0), "customerId" varchar, "medicineId" varchar)`
    );
    await queryRunner.query(
      `INSERT INTO "dispensed_medicine"("id", "createdAt", "updatedAt", "deletedAt", "quantity", "customerId", "medicineId") SELECT "id", "createdAt", "updatedAt", "deletedAt", "quantity", "customerId", "medicineId" FROM "temporary_dispensed_medicine"`
    );
    await queryRunner.query(`DROP TABLE "temporary_dispensed_medicine"`);
    await queryRunner.query(`DROP TABLE "active_session"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "role"`);
    await queryRunner.query(`DROP TABLE "dispensed_medicine"`);
    await queryRunner.query(`DROP TABLE "medicine"`);
    await queryRunner.query(`DROP TABLE "customer"`);
  }
}
