import {MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class userToken1612996095745 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createForeignKey(
            'usersToken',
            new TableForeignKey({
                name: 'TokenUser',
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('usersToken','userToken');
    }

}
