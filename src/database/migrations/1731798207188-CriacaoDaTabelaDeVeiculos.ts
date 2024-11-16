import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CriacaoDaTabelaDeVeiculos1731798207188
  implements MigrationInterface
{
  tableName = 'veiculos';
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
            name: 'placa',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'classificacao',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'descricao',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'cpf_mensalista',
            type: 'varchar',
            length: '11',
            isNullable: true,
          },
          {
            name: 'vaga',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'estacionamento_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
            isNullable: false,
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
            columnNames: ['estacionamento_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'estacionamento',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
