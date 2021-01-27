import {MigrationInterface, QueryRunner,Table} from "typeorm";

export class createAppointment1611690295462 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'appointments',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()'
                    },
                    {
                        name: 'date',
                        type: 'timestamp with time zone',
                        isNullable: false,
                    },
                    {
                        name: 'provider',
                        type: 'varchar',
                        isNullable: false,
                    }
                ]
            })

        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('appointments');
    }

}
