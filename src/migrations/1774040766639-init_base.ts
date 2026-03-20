import { MigrationInterface, QueryRunner } from "typeorm";

export class InitBase1774040766639 implements MigrationInterface {
    name = 'InitBase1774040766639'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "seats" ("seat_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" boolean NOT NULL DEFAULT false, "user_id" uuid, "reserved_at" TIMESTAMP, CONSTRAINT "PK_9d655d853d2fbbb3710831d3ca7" PRIMARY KEY ("seat_id")); COMMENT ON COLUMN "seats"."status" IS 'Флаг, показывающий является ли место занятым'; COMMENT ON COLUMN "seats"."user_id" IS 'Идентификатор пользователя'; COMMENT ON COLUMN "seats"."reserved_at" IS 'Время резерва'`);
        await queryRunner.query(`COMMENT ON TABLE "seats" IS 'Таблица мест'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON TABLE "seats" IS NULL`);
        await queryRunner.query(`DROP TABLE "seats"`);
    }

}
