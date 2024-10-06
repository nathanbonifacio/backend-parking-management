import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CriacaoDaTabelaEstacionamento1728235080374
  implements MigrationInterface
{
  tableName = 'estacionamento';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            generationStrategy: 'increment',
            isGenerated: true,
          },
          {
            name: 'estacionamento_nome',
            type: 'varchar',
            length: '45',
            isNullable: false,
          },
          {
            name: 'endereco',
            type: 'varchar',
            length: '45',
            isNullable: false,
          },
          {
            name: 'total_vagas',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'proprietario_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'funcionario_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            onUpdate: 'now()',
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['proprietario_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'proprietario',
          },
          {
            columnNames: ['funcionario_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'funcionario',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
