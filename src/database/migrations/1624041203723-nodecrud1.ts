import {MigrationInterface, QueryRunner} from 'typeorm'

export class nodecrud11624041203723 implements MigrationInterface {
    name = 'nodecrud11624041203723'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE TABLE `user` (`id` varchar(36) NOT NULL, `username` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `age` int NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB')
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('DROP TABLE `user`')
    }

}
