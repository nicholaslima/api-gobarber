import {MigrationInterface, QueryRunner,Table} from "typeorm";

export class createAppointment1611690295462 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'appointments',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
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
                        name:'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'update_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'provider_id',
                        type: 'uuid',
                        isNullable: true,
                    }
                ]
            })

        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('appointments');
    }

}
